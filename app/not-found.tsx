'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
    const [blocks, setBlocks] = useState<Array<{
        color: string;
        left: string;
        animationDelay: string;
        animationDuration: string;
        clipPath: string;
    }>>([]);

    useEffect(() => {
        const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-cyan-500', 'bg-pink-500', 'bg-orange-500'];
        const shapes = [
            'polygon(0% 0%, 66% 0%, 66% 66%, 100% 66%, 100% 100%, 0% 100%)',
            'polygon(33% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 66%, 33% 66%)',
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            'polygon(0% 0%, 66% 0%, 66% 33%, 100% 33%, 100% 100%, 33% 100%, 33% 66%, 0% 66%)',
            'polygon(33% 0%, 100% 0%, 100% 66%, 66% 66%, 66% 100%, 0% 100%, 0% 33%, 33% 33%)',
            'polygon(0% 33%, 100% 33%, 100% 66%, 0% 66%)',
            'polygon(33% 0%, 66% 0%, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 33% 100%, 33% 66%, 0% 66%, 0% 33%, 33% 33%)',
        ];

        const newBlocks = Array.from({ length: 15 }).map(() => ({
            color: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.floor(Math.random() * 90)}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
            clipPath: shapes[Math.floor(Math.random() * shapes.length)]
        }));

        setBlocks(newBlocks);
    }, []);

    return (
        <div className="min-h-screen w-full bg-gray-900 overflow-hidden relative flex flex-col items-center justify-center">
            {/* Falling Tetris blocks background - we'll add animations with CSS */}
            <div className="absolute inset-0">
                {/* The tetris blocks will be created using CSS */}
                {blocks.map((block, i) => (
                    <div 
                        key={i}
                        className={`
                            absolute w-10 h-10 opacity-80
                            ${block.color}
                            animate-tetris-fall
                        `}
                        style={{
                            left: block.left,
                            animationDelay: block.animationDelay,
                            animationDuration: block.animationDuration,
                            clipPath: block.clipPath
                        }}
                    />
                ))}
            </div>
            
            <div className="z-10 text-center p-8 bg-gray-800 bg-opacity-90 rounded-lg border-4 border-gray-700 shadow-lg">
                <h1 className="text-5xl font-bold text-red-500 mb-4 font-['Press_Start_2P'] drop-shadow-[3px_3px_0_rgba(0,0,0,0.8)]">404</h1>
                <h2 className="text-3xl font-bold text-white mb-6 font-['Press_Start_2P'] drop-shadow-[3px_3px_0_rgba(0,0,0,0.8)]">GAME OVER</h2>
                <p className="text-xl text-gray-300 mb-8">The page you're looking for has been cleared!</p>
                <Link href="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-[0_4px_0_#7a0000] transform transition-transform duration-100 hover:translate-y-0.5 hover:shadow-[0_2px_0_#7a0000] inline-block">
                    CONTINUE? (YES)
                </Link>
            </div>

            {/* Tailwind doesn't support keyframes out of the box, so we need a style tag */}
            <style jsx global>{`
                @keyframes tetris-fall {
                    0% { 
                        transform: translateY(-50px) rotate(0deg);
                    }
                    100% { 
                        transform: translateY(calc(100vh + 50px)) rotate(360deg);
                    }
                }
                .animate-tetris-fall {
                    animation: tetris-fall linear forwards;
                    top: -50px;
                }
            `}</style>
        </div>
    );
}

