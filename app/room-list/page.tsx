'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGamepad, FaLock, FaSearch, FaPlus, FaUsers, FaUser, FaTrophy, FaEye } from 'react-icons/fa';

// Define types
interface Room {
    id: string;
    name: string;
    host: {
        username: string;
        avatar: string;
        rank: {
            tier: string;
            icon: string;
        };
    };
    mode: 'casual' | 'ranked' | 'tournament';
    players: {
        current: number;
        max: number;
    };
    status: 'waiting' | 'in-progress' | 'full';
    isPrivate: boolean;
    createdAt: string;
}

const RoomListPage = () => {
    const router = useRouter();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'casual' | 'ranked' | 'tournament'>('all');
    const [showPrivate, setShowPrivate] = useState(true);

    // Fetch rooms data
    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                // Simulate API call with a delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Mock data for rooms
                const mockRooms = [
                    {
                        id: '1',
                        name: 'Pro Tetrix Showdown',
                        host: {
                            username: 'tetrixKing',
                            avatar: '/images/default_pic.webp',
                            rank: {
                                tier: 'Diamond',
                                icon: '/images/Ranks/rank-diamond.webp'
                            }
                        },
                        mode: 'ranked',
                        players: {
                            current: 2,
                            max: 4
                        },
                        status: 'waiting',
                        isPrivate: false,
                        createdAt: '2023-06-10T14:30:00Z'
                    },
                    {
                        id: '2',
                        name: 'Casual Fun Room',
                        host: {
                            username: 'blockmaster',
                            avatar: '/images/default_pic.webp',
                            rank: {
                                tier: 'Gold',
                                icon: '/images/Ranks/rank-gold.webp'
                            }
                        },
                        mode: 'casual',
                        players: {
                            current: 3,
                            max: 6
                        },
                        status: 'in-progress',
                        isPrivate: false,
                        createdAt: '2023-06-10T15:45:00Z'
                    },
                    {
                        id: '3',
                        name: 'Tournament Finals',
                        host: {
                            username: 'tetrixPro',
                            avatar: '/images/default_pic.webp',
                            rank: {
                                tier: 'Master',
                                icon: '/images/Ranks/rank-grandmaster.webp'
                            }
                        },
                        mode: 'tournament',
                        players: {
                            current: 8,
                            max: 8
                        },
                        status: 'full',
                        isPrivate: false,
                        createdAt: '2023-06-10T16:20:00Z'
                    },
                    {
                        id: '4',
                        name: 'Private Practice',
                        host: {
                            username: 'puzzleQueen',
                            avatar: '/images/default_pic.webp',
                            rank: {
                                tier: 'Platinum',
                                icon: '/images/Ranks/rank-platinud.webp'
                            }
                        },
                        mode: 'casual',
                        players: {
                            current: 1,
                            max: 2
                        },
                        status: 'waiting',
                        isPrivate: true,
                        createdAt: '2023-06-10T17:10:00Z'
                    },
                    {
                        id: '5',
                        name: 'Beginners Welcome',
                        host: {
                            username: 'newplayer',
                            avatar: '/images/default_pic.webp',
                            rank: {
                                tier: 'Bronze',
                                icon: '/images/Ranks/rank-bronze.webp'
                            }
                        },
                        mode: 'casual',
                        players: {
                            current: 2,
                            max: 4
                        },
                        status: 'waiting',
                        isPrivate: false,
                        createdAt: '2023-06-10T18:05:00Z'
                    },
                    {
                        id: '6',
                        name: 'Experts Only',
                        host: {
                            username: 'grandmaster',
                            avatar: '/images/default_pic.webp',
                            rank: {
                                tier: 'Grandmaster',
                                icon: '/images/Ranks/rank-grandmaster.webp'
                            }
                        },
                        mode: 'ranked',
                        players: {
                            current: 1,
                            max: 2
                        },
                        status: 'waiting',
                        isPrivate: false,
                        createdAt: '2023-06-10T18:30:00Z'
                    },
                ] as Room[];
                
                setRooms(mockRooms);
            } catch (err) {
                console.error(err);
                setError('Failed to load rooms');
            } finally {
                setLoading(false);
            }
        };
        
        fetchRooms();
    }, []);

    // Filter rooms based on search term, filter, and private status
    const filteredRooms = rooms.filter(room => {
        // Filter by search term
        const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                                 room.host.username.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Filter by game mode
        const matchesMode = activeFilter === 'all' || room.mode === activeFilter;
        
        // Filter by private status
        const matchesPrivate = showPrivate || !room.isPrivate;
        
        return matchesSearch && matchesMode && matchesPrivate;
    });

    // Handle room join
    const handleJoinRoom = (roomId: string, isPrivate: boolean) => {
        if (isPrivate) {
            // Prompt for password
            const password = prompt('Enter room password:');
            if (!password) return;
            
            // In a real app, you would validate the password before joining
            console.log(`Joining private room ${roomId} with password ${password}`);
        }
        
        router.push(`/room/${roomId}`);
    };

    // Handle create room
    const handleCreateRoom = () => {
        router.push('/create-room');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-cyan-400 animate-pulse text-xl">Loading rooms...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <div className="text-red-400 mb-4 text-xl">{error}</div>
                <button 
                    onClick={() => window.location.reload()}
                    className="text-cyan-400 hover:text-cyan-300 bg-gray-800 px-6 py-2 rounded-full"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center py-8 px-4 relative">
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

            <div className="w-full max-w-6xl z-10 flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 text-center">
                        Tetrix Game Rooms
                    </h1>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto">
                        Join an existing room or create your own to play Tetrix with friends and competitors around the world.
                    </p>
                </div>

                {/* Search and filters */}
                <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search bar */}
                        <div className="relative w-full lg:w-1/3">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search rooms or hosts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-800/70 text-white placeholder-gray-400 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                            />
                        </div>

                        {/* Game mode filters */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeFilter === 'all'
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                All Rooms
                            </button>
                            <button
                                onClick={() => setActiveFilter('casual')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeFilter === 'casual'
                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                Casual
                            </button>
                            <button
                                onClick={() => setActiveFilter('ranked')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeFilter === 'ranked'
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                Ranked
                            </button>
                            <button
                                onClick={() => setActiveFilter('tournament')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeFilter === 'tournament'
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                Tournament
                            </button>
                        </div>

                        {/* Create room button */}
                        <button
                            onClick={handleCreateRoom}
                            className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium transition-all flex items-center gap-2"
                        >
                            <FaPlus /> Create Room
                        </button>
                    </div>

                    {/* Additional filters */}
                    <div className="mt-4 flex items-center">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="showPrivate"
                                checked={showPrivate}
                                onChange={() => setShowPrivate(!showPrivate)}
                                className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-gray-700"
                            />
                            <label htmlFor="showPrivate" className="ml-2 text-sm text-gray-300">
                                Show private rooms
                            </label>
                        </div>
                    </div>
                </div>

                {/* Room list */}
                <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
                    <div className="border-b border-cyan-500/20 px-6 py-4 flex justify-between items-center">
                        <h3 className="text-cyan-400 font-medium">Available Rooms ({filteredRooms.length})</h3>
                    </div>

                    {filteredRooms.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            No rooms found matching your criteria
                        </div>
                    ) : (
                        <div className="divide-y divide-cyan-500/10">
                            {filteredRooms.map(room => (
                                <div 
                                    key={room.id} 
                                    className="p-6 hover:bg-gray-800/50 transition-colors"
                                >
                                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Room status indicator */}
                                            <div className={`w-3 h-14 rounded-r-full ${
                                                room.status === 'waiting' ? 'bg-green-500' :
                                                room.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}></div>
                                            
                                            {/* Room info */}
                                            <div>
                                                <div className="flex items-center">
                                                    <h3 className="text-xl font-medium text-white">{room.name}</h3>
                                                    {room.isPrivate && (
                                                        <FaLock className="ml-2 text-yellow-400" title="Private Room" />
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center gap-4 mt-1">
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <FaGamepad className="mr-1" /> 
                                                        <span className={`
                                                            ${room.mode === 'casual' ? 'text-green-400' : 
                                                                room.mode === 'ranked' ? 'text-cyan-400' : 'text-purple-400'}
                                                        `}>
                                                            {room.mode.charAt(0).toUpperCase() + room.mode.slice(1)}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <FaUsers className="mr-1" /> 
                                                        <span className={`${
                                                            room.players.current === room.players.max ? 'text-red-400' : 'text-white'
                                                        }`}>
                                                            {room.players.current}/{room.players.max}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="text-gray-400 text-sm">
                                                        {new Date(room.createdAt).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            {/* Host info */}
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center">
                                                    <FaUser className="text-gray-400 mr-1" />
                                                    <span className="text-sm text-gray-300">Host:</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="relative mr-2">
                                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                                            <Image
                                                                src={room.host.avatar}
                                                                alt={room.host.username}
                                                                width={32}
                                                                height={32}
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full overflow-hidden">
                                                            <Image
                                                                src={room.host.rank.icon}
                                                                alt={room.host.rank.tier}
                                                                width={16}
                                                                height={16}
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="text-cyan-400">{room.host.username}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Action buttons */}
                                            <div className="flex gap-2">
                                                {room.status === 'in-progress' ? (
                                                    <button 
                                                        className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-sm font-medium transition-all flex items-center gap-2 border border-purple-500/30"
                                                    >
                                                        <FaEye /> Spectate
                                                    </button>
                                                ) : room.status === 'full' ? (
                                                    <button 
                                                        disabled
                                                        className="px-4 py-2 rounded-lg bg-gray-700 text-gray-400 text-sm font-medium cursor-not-allowed flex items-center gap-2"
                                                    >
                                                        <FaUsers /> Full
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleJoinRoom(room.id, room.isPrivate)}
                                                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white text-sm font-medium transition-all flex items-center gap-2"
                                                    >
                                                        <FaGamepad /> Join
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-900/80 border border-cyan-500/20 rounded-xl p-4 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                            <FaGamepad className="text-green-400 text-xl" />
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm">Active Games</div>
                            <div className="text-white text-2xl font-bold">12</div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-900/80 border border-cyan-500/20 rounded-xl p-4 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mr-4">
                            <FaUsers className="text-cyan-400 text-xl" />
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm">Online Players</div>
                            <div className="text-white text-2xl font-bold">48</div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-900/80 border border-cyan-500/20 rounded-xl p-4 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                            <FaTrophy className="text-purple-400 text-xl" />
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm">Ongoing Tournaments</div>
                            <div className="text-white text-2xl font-bold">3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomListPage;