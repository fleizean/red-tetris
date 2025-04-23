'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaGamepad, FaPause, FaPlay, FaRedo, FaUsers, FaTrophy, FaArrowLeft, FaPowerOff, FaSignOutAlt } from 'react-icons/fa';

// Tetris game constants
const ROWS = 20;
const COLS = 10;
const CELL_SIZE = 30;

// Tetris shapes with futuristic colors matching the theme
const SHAPES = [
    { name: "I", matrix: [[1, 1, 1, 1]], color: "#00FFFF" },        // Cyan
    { name: "J", matrix: [[1, 0, 0], [1, 1, 1]], color: "#0040FF" }, // Deep Blue
    { name: "L", matrix: [[0, 0, 1], [1, 1, 1]], color: "#FF8000" }, // Orange
    { name: "O", matrix: [[1, 1], [1, 1]], color: "#FFFF00" },       // Yellow
    { name: "S", matrix: [[0, 1, 1], [1, 1, 0]], color: "#00FF00" }, // Green
    { name: "T", matrix: [[0, 1, 0], [1, 1, 1]], color: "#AA00FF" }, // Purple
    { name: "Z", matrix: [[1, 1, 0], [0, 1, 1]], color: "#FF0000" }  // Red
];

// Mock player data
const mockPlayers = [
    { id: 1, name: "tetrixKing", score: 1250, rank: { tier: "Diamond", icon: "/images/Ranks/rank-diamond.webp" } },
    { id: 2, name: "blockmaster", score: 980, rank: { tier: "Gold", icon: "/images/Ranks/rank-gold.webp" } },
    { id: 3, name: "tetrixPro", score: 750, rank: { tier: "Master", icon: "/images/Ranks/rank-grandmaster.webp" } },
    { id: 4, name: "You", score: 500, isCurrentPlayer: true, rank: { tier: "Platinum", icon: "/images/Ranks/rank-platinud.webp" } },
];

const TetrisGame = () => {
    const params = useParams();
    const roomName = params.roomName;
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const [gameTime, setGameTime] = useState(0); // Time in seconds
    const [speedMultiplier, setSpeedMultiplier] = useState(10); // Speed multiplier based on time

    const [players, setPlayers] = useState(mockPlayers);
    const [board, setBoard] = useState(createEmptyBoard());
    const [currentPiece, setCurrentPiece] = useState<{
        x: number;
        y: number;
        shape: number[][];
        color: string;
        name: string;
    } | null>(null);
    const [nextPiece, setNextPiece] = useState<{
        x: number;
        y: number;
        shape: number[][];
        color: string;
        name: string;
    } | null>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);

    // Create an empty board
    function createEmptyBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    // Generate a random piece
    const getRandomPiece = useCallback(() => {
        const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        return {
            x: Math.floor(COLS / 2) - 1,
            y: 0,
            shape: randomShape.matrix,
            color: randomShape.color,
            name: randomShape.name
        };
    }, []);

    // Initialize the game
    useEffect(() => {
        if (!currentPiece) {
            setCurrentPiece(getRandomPiece());
        }
        if (!nextPiece) {
            setNextPiece(getRandomPiece());
        }

        // Focus on game container to prevent scrolling with arrow keys
        if (gameContainerRef.current) {
            gameContainerRef.current.focus();
        }
    }, [currentPiece, nextPiece, getRandomPiece]);


    // Check for collisions
    const checkCollision = (piece: { x: number; y: number; shape: number[][] }, boardToCheck: (string | number)[][]) => {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const newX = piece.x + x;
                    const newY = piece.y + y;

                    if (
                        newX < 0 ||
                        newX >= COLS ||
                        newY >= ROWS ||
                        (newY >= 0 && boardToCheck[newY][newX])
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    // Move piece down
    const moveDown = () => {
        if (!currentPiece) return;

        const newPiece = { ...currentPiece, y: currentPiece.y + 1 };

        if (checkCollision(newPiece, board)) {
            // Lock the piece in place
            const newBoard = [...board];
            let gameOverDetected = false;

            for (let y = 0; y < currentPiece.shape.length; y++) {
                for (let x = 0; x < currentPiece.shape[y].length; x++) {
                    if (currentPiece.shape[y][x]) {
                        const boardY = currentPiece.y + y;

                        // If any part of the piece is above the board when locked
                        if (boardY < 0) {
                            gameOverDetected = true;
                            break;
                        }

                        newBoard[boardY][currentPiece.x + x] = currentPiece.color;
                    }
                }
                if (gameOverDetected) break;
            }

            if (gameOverDetected) {
                setGameOver(true);
                return;
            }

            // Check for completed rows
            const { updatedBoard, clearedLines } = clearRows(newBoard);
            setBoard(updatedBoard);

            if (clearedLines > 0) {
                const newLines = lines + clearedLines;
                setLines(newLines);

                // Level up every 10 lines
                if (Math.floor(newLines / 10) > Math.floor(lines / 10)) {
                    setLevel(prev => prev + 1);
                }

                // Calculate score based on level and lines cleared
                const points = [40, 100, 300, 1200][Math.min(clearedLines - 1, 3)] * level;
                setScore(prevScore => prevScore + points);
            }

            // Set the next piece
            setCurrentPiece(nextPiece);
            setNextPiece(getRandomPiece());

            // Update player score
            const updatedPlayers = players.map(player => {
                if (player.isCurrentPlayer) {
                    return { ...player, score: player.score + 10 }; // Small points for placing a piece
                }
                return player;
            });
            setPlayers(updatedPlayers);
        } else {
            setCurrentPiece(newPiece);
        }
    };

    // Clear completed rows
    const clearRows = (board: (string | number)[][]) => {
        const newBoard = [...board];
        let linesCleared = 0;

        for (let y = ROWS - 1; y >= 0; y--) {
            if (newBoard[y].every(cell => cell !== 0)) {
                // Clear the row
                newBoard.splice(y, 1);
                newBoard.unshift(Array(COLS).fill(0));
                linesCleared++;
                y++; // Check the same row again
            }
        }

        return { updatedBoard: newBoard, clearedLines: linesCleared };
    };


    // Move piece left/right
    const moveHorizontal = (dir: number) => {
        if (!currentPiece || gameOver || isPaused) return;

        const newPiece = { ...currentPiece, x: currentPiece.x + dir };
        if (!checkCollision(newPiece, board)) {
            setCurrentPiece(newPiece);
        }
    };

    // Rotate piece
    const rotate = () => {
        if (!currentPiece || gameOver || isPaused) return;

        const rotated = {
            ...currentPiece,
            shape: currentPiece.shape[0].map((_, i) =>
                currentPiece.shape.map(row => row[i]).reverse()
            )
        };

        if (!checkCollision(rotated, board)) {
            setCurrentPiece(rotated);
        }
    };

    useEffect(() => {
        if (!currentPiece) {
            const newPiece = getRandomPiece();

            // Check if the starting position is already occupied
            if (checkCollision(newPiece, board)) {
                console.log("Game over detected - collision at start position");
                setGameOver(true);
            } else {
                // Also check if there are any blocks at the top row
                // This is an additional check that helps catch some edge cases
                const topRowHasBlocks = board[0].some(cell => cell !== 0);
                if (topRowHasBlocks) {
                    console.log("Game over detected - blocks at top row");
                    setGameOver(true);
                } else {
                    setCurrentPiece(newPiece);
                }
            }
        }

        if (!nextPiece) {
            setNextPiece(getRandomPiece());
        }

        // Focus on game container to prevent scrolling with arrow keys
        if (gameContainerRef.current) {
            gameContainerRef.current.focus();
        }
    }, [currentPiece, nextPiece, getRandomPiece, board]);

    const getGhostPosition = (piece: typeof currentPiece) => {
        if (!piece) return null;

        let ghostPiece = { ...piece };
        let ghostY = piece.y;

        // Drop the ghost piece as far as it can go
        while (!checkCollision({ ...ghostPiece, y: ghostY + 1 }, board)) {
            ghostY++;
        }

        return { ...ghostPiece, y: ghostY };
    };

    
    useEffect(() => {
        if (gameOver || isPaused) return;
        
        const timer = setInterval(() => {
            setGameTime(prevTime => {
                const newTime = prevTime + 1;
                
                // Increase difficulty at specific time thresholds
                // 2 minutes = 120 seconds, 4 minutes = 240 seconds, etc.
                if (newTime === 120) {
                    setSpeedMultiplier(1.2); // 20% faster
                } else if (newTime === 240) {
                    setSpeedMultiplier(1.5); // 50% faster
                } else if (newTime === 360) {
                    setSpeedMultiplier(1.8); // 80% faster
                } else if (newTime === 480) {
                    setSpeedMultiplier(2.2); // 120% faster
                }
                
                return newTime;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [gameOver, isPaused]);

    
    useEffect(() => {
        if (gameOver || isPaused) return;
        
        // Additional check for pieces at the top row
        const topRowHasBlocks = board[0].some(cell => cell !== 0);
        if (topRowHasBlocks) {
            console.log("Game over detected in game loop - blocks at top row");
            setGameOver(true);
            return;
        }
        
        // Apply both level-based speed and time-based multiplier
        const baseDropSpeed = Math.max(100, 500 - (level - 1) * 50); 
        const adjustedDropSpeed = Math.max(50, Math.floor(baseDropSpeed / speedMultiplier));
        
        const gameLoop = setInterval(() => {
            moveDown();
        }, adjustedDropSpeed);
        
        return () => clearInterval(gameLoop);
    }, [currentPiece, board, gameOver, isPaused, level, speedMultiplier]);

    // Handle keydown events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;

            // Prevent default behavior for arrow keys to avoid scrolling
            if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Space"].includes(e.code)) {
                e.preventDefault();
            }

            switch (e.code) {
                case 'ArrowLeft':
                    moveHorizontal(-1);
                    break;
                case 'ArrowRight':
                    moveHorizontal(1);
                    break;
                case 'ArrowDown':
                    moveDown();
                    break;
                case 'ArrowUp':
                    rotate();
                    break;
                                                          // Space tuşu işleme fonksiyonunu düzenleyelim
                                        case 'Space':
                                            // Hard drop - instantly place the piece at the bottom and lock it
                                            if (currentPiece && !isPaused) {
                                                const ghostPiece = getGhostPosition(currentPiece);
                                                if (ghostPiece) {
                                                    // Önce hayalet parçayı yerleştir
                                                    setCurrentPiece(ghostPiece);
                                                    
                                                    // Tahtaya parçayı kilitle (moveDown ile aynı mantığı kullanacağız)
                                                    const newBoard = [...board];
                                                    let gameOverDetected = false;
                                                    
                                                    for (let y = 0; y < ghostPiece.shape.length; y++) {
                                                        for (let x = 0; x < ghostPiece.shape[y].length; x++) {
                                                            if (ghostPiece.shape[y][x]) {
                                                                const boardY = ghostPiece.y + y;
                                                                
                                                                // If any part of the piece is above the board when locked
                                                                if (boardY < 0) {
                                                                    gameOverDetected = true;
                                                                    break;
                                                                }
                                                                
                                                                newBoard[boardY][ghostPiece.x + x] = ghostPiece.color;
                                                            }
                                                        }
                                                        if (gameOverDetected) break;
                                                    }
                                                    
                                                    if (gameOverDetected) {
                                                        setGameOver(true);
                                                        return;
                                                    }
                                                    
                                                    // Check for completed rows
                                                    const { updatedBoard, clearedLines } = clearRows(newBoard);
                                                    setBoard(updatedBoard);
                                                    
                                                    if (clearedLines > 0) {
                                                        const newLines = lines + clearedLines;
                                                        setLines(newLines);
                                                        
                                                        // Level up every 10 lines
                                                        if (Math.floor(newLines / 10) > Math.floor(lines / 10)) {
                                                            setLevel(prev => prev + 1);
                                                        }
                                                        
                                                        // Calculate score based on level and lines cleared
                                                        const points = [40, 100, 300, 1200][Math.min(clearedLines - 1, 3)] * level;
                                                        setScore(prevScore => prevScore + points);
                                                    }
                                                    
                                                    // Hemen bir sonraki parçaya geç
                                                    setCurrentPiece(nextPiece);
                                                    setNextPiece(getRandomPiece());
                                                    
                                                    // Update player score
                                                    const updatedPlayers = players.map(player => {
                                                        if (player.isCurrentPlayer) {
                                                            return { ...player, score: player.score + 10 }; // Small points for placing a piece
                                                        }
                                                        return player;
                                                    });
                                                    setPlayers(updatedPlayers);
                                                }
                                            }
                                            break;
                case 'KeyP':
                    setIsPaused(!isPaused);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPiece, board, gameOver, isPaused]);

    // Restart game
    const restartGame = () => {
        setBoard(createEmptyBoard());
        setCurrentPiece(getRandomPiece());
        setNextPiece(getRandomPiece());
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
        setLevel(1);
        setLines(0);
        setGameTime(0);
        setSpeedMultiplier(1);
        
        // Reset player scores
        const resetPlayers = players.map(player => ({
            ...player,
            score: player.isCurrentPlayer ? 0 : player.score
        }));
        setPlayers(resetPlayers);
    };
    
    // Helper function to format time as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Render game board
    const renderBoard = () => {
        const boardWithPiece = [...board.map(row => [...row])];
        const ghostPiece = currentPiece ? getGhostPosition(currentPiece) : null;

        // First, render the ghost piece (so it appears behind the actual piece)
        if (ghostPiece && !gameOver && !isPaused) {
            for (let y = 0; y < ghostPiece.shape.length; y++) {
                for (let x = 0; x < ghostPiece.shape[y].length; x++) {
                    if (ghostPiece.shape[y][x]) {
                        const boardY = ghostPiece.y + y;
                        const boardX = ghostPiece.x + x;
                        if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
                            // Use the same color as current piece but with transparency
                            boardWithPiece[boardY][boardX] = 'ghost'; // Mark as ghost for rendering
                        }
                    }
                }
            }
        }

        // Then render the current piece (so it appears on top of the ghost)
        if (currentPiece) {
            for (let y = 0; y < currentPiece.shape.length; y++) {
                for (let x = 0; x < currentPiece.shape[y].length; x++) {
                    if (currentPiece.shape[y][x]) {
                        const boardY = currentPiece.y + y;
                        const boardX = currentPiece.x + x;
                        if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
                            boardWithPiece[boardY][boardX] = currentPiece.color;
                        }
                    }
                }
            }
        }

        return (
            <div
                className="relative bg-gray-900/90 border-2 border-cyan-500/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                style={{
                    width: COLS * CELL_SIZE + 4,
                    height: ROWS * CELL_SIZE + 4
                }}
            >
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-20 z-0">
                    {Array.from({ length: ROWS * COLS }).map((_, i) => (
                        <div
                            key={`grid-${i}`}
                            className="border-[0.5px] border-cyan-500/10"
                        />
                    ))}
                </div>

                {/* Game cells */}
                <div className="absolute inset-0 z-10">
                    {boardWithPiece.map((row, y) =>
                        row.map((cell, x) => (
                            <div
                                key={`${y}-${x}`}
                                className={`absolute ${cell ? 'border border-white/20' : ''} rounded-sm transition-colors duration-100`}
                                style={{
                                    backgroundColor: cell === 'ghost'
                                        ? `${currentPiece?.color}50` // 50 is the hex for 30% opacity
                                        : cell
                                            ? cell
                                            : 'transparent',
                                    boxShadow: cell
                                        ? cell === 'ghost'
                                            ? '0 0 3px rgba(0, 255, 255, 0.2)'
                                            : '0 0 6px rgba(0, 255, 255, 0.5)'
                                        : 'none',
                                    width: CELL_SIZE,
                                    height: CELL_SIZE,
                                    left: x * CELL_SIZE,
                                    top: y * CELL_SIZE,
                                    border: cell === 'ghost' ? '1px dashed rgba(255, 255, 255, 0.3)' : cell ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
                                }}
                            />
                        ))
                    )}
                </div>

                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>

                {/* Game over / Paused overlays */}
                {(gameOver || isPaused) && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                        <div className="bg-gray-900/90 border-2 border-cyan-500/50 rounded-xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.4)] text-center">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
                                {gameOver ? 'Game Over' : 'Paused'}
                            </h2>

                            {gameOver && (
                                <div className="mb-4">
                                    <p className="text-cyan-400 mb-1">Final Score: {score}</p>
                                    <p className="text-gray-300">Lines Cleared: {lines}</p>
                                </div>
                            )}

                            <button
                                onClick={gameOver ? restartGame : () => setIsPaused(false)}
                                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium transition-all flex items-center gap-2 mx-auto"
                            >
                                {gameOver ? <FaRedo /> : <FaPlay />}
                                {gameOver ? 'Play Again' : 'Resume'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Render next piece preview
    const renderNextPiece = () => {
        if (!nextPiece) return null;

        const shape = nextPiece.shape;
        const width = shape[0].length * (CELL_SIZE / 1.5);
        const height = shape.length * (CELL_SIZE / 1.5);

        return (
            <div
                className="relative bg-gray-900/80 border border-cyan-500/20 rounded-lg flex items-center justify-center p-3"
                style={{
                    width: width + 30,
                    height: height + 30
                }}
            >
                {shape.map((row, y) =>
                    row.map((cell, x) => (
                        <div
                            key={`next-${y}-${x}`}
                            className={`absolute ${cell ? 'border border-white/20 rounded-sm' : ''}`}
                            style={{
                                backgroundColor: cell ? nextPiece.color : 'transparent',
                                boxShadow: cell ? '0 0 4px rgba(0, 255, 255, 0.5)' : 'none',
                                width: (CELL_SIZE / 1.5),
                                height: (CELL_SIZE / 1.5),
                                left: x * (CELL_SIZE / 1.5) + 15,
                                top: y * (CELL_SIZE / 1.5) + 15,
                            }}
                        />
                    ))
                )}
            </div>
        );
    };

    return (
        <div
            ref={gameContainerRef}
            tabIndex={0} // Make the container focusable
            className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-4 relative focus:outline-none"
        >
            {/* Futuristic background elements */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <Image
                    src="/images/SignInUp/signinup-bg.png"
                    alt="Futuristic Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
            </div>

            <div className="w-full max-w-6xl z-10 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="flex items-center gap-3">
                        <div className="text-cyan-400">
                            <FaGamepad className="text-2xl" />
                        </div>
                        <div>
                            <span className="text-gray-300 text-sm block">TETRIX ROOM</span>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                                {roomName ? decodeURIComponent(roomName.toString()) : 'Unnamed Room'}
                            </span>
                        </div>
                    </h1>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => window.history.back()}
                            className="px-3 py-3 rounded-lg bg-red-700 text-white hover:bg-red-800 text-sm transition-all flex items-center gap-2"
                        >
                            <FaSignOutAlt /> <span>Leave Game</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
                    {/* Game board area */}
                    <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm flex flex-col items-center">
                        {renderBoard()}
                    </div>

                    {/* Side panel */}
                    <div className="w-full lg:w-auto flex flex-col gap-4" style={{ height: `${ROWS * CELL_SIZE + 12 + 48}px` }}>
                        {/* Score & level */}
                        <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
    <div className="grid grid-cols-3 gap-4 text-center mb-3">
        <div>
            <div className="text-gray-400 text-sm">Score</div>
            <div className="text-2xl font-bold text-cyan-400">{score}</div>
        </div>
        <div>
            <div className="text-gray-400 text-sm">Level</div>
            <div className="text-2xl font-bold text-purple-400">{level}</div>
        </div>
        <div>
            <div className="text-gray-400 text-sm">Lines</div>
            <div className="text-2xl font-bold text-green-400">{lines}</div>
        </div>
    </div>

    {/* Süre ve Hız Çarpanı bilgilerini ekleyelim */}
    <div className="grid grid-cols-2 gap-4 text-center border-t border-cyan-500/20 pt-3">
        <div>
            <div className="text-gray-400 text-sm">Time</div>
            <div className="text-xl font-medium text-amber-400">{formatTime(gameTime)}</div>
        </div>
        <div>
            <div className="text-gray-400 text-sm">Speed</div>
            <div className="text-xl font-medium text-red-400">
                {speedMultiplier === 1 ? 'Normal' : `${speedMultiplier.toFixed(1)}x`}
            </div>
        </div>
    </div>
</div>

                        {/* Next piece */}
                        <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
                            <h3 className="text-cyan-400 font-medium mb-3 text-center">Next Piece</h3>
                            <div className="flex justify-center">
                                {renderNextPiece()}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
                            <h3 className="text-cyan-400 font-medium mb-2">Controls</h3>
                            <div className="text-gray-300 text-sm">
                                <div className="flex justify-between mb-1">
                                    <span>← →</span>
                                    <span>Move</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>↑</span>
                                    <span>Rotate</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>↓</span>
                                    <span>Move Down</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Space</span>
                                    <span>Hard Drop</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>P</span>
                                    <span>Pause</span>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-all flex items-center justify-center gap-2"
                            >
                                {isPaused ? <FaPlay className="text-green-400" /> : <FaPause className="text-yellow-400" />}
                                {isPaused ? 'Resume' : 'Pause'}
                            </button>

                            <button
                                onClick={restartGame}
                                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-all flex items-center justify-center gap-2"
                            >
                                <FaRedo className="text-cyan-400" />
                                Restart
                            </button>
                        </div>

                        {/* Players */}
                        <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm flex-grow overflow-auto">
                            <h3 className="text-cyan-400 font-medium mb-3">Players in Room</h3>
                            <div className="space-y-2">
                                {players.sort((a, b) => b.score - a.score).map((player) => (
                                    <div
                                        key={player.id}
                                        className={`flex items-center justify-between p-3 rounded-lg ${player.isCurrentPlayer ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-gray-800/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 min-w-0 flex-1 mb-2">
                                            <div className="w-6 h-6 flex-shrink-0">
                                                <Image
                                                    src={player.rank.icon}
                                                    alt={player.rank.tier}
                                                    width={32}
                                                    height={32}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className={`${player.isCurrentPlayer ? 'text-cyan-400 font-medium' : 'text-gray-300'} truncate`}>
                                                {player.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                            <FaTrophy className="text-yellow-500" />
                                            <span className="text-gray-300">{player.score}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TetrisGame;
