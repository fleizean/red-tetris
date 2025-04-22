'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaGamepad, FaLock, FaLockOpen, FaTrophy, FaUserFriends, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Friend } from '@/types/Friend'; // Adjust the import based on your project structure
import { User } from '@/types/User'; // Adjust the import based on your project structure
import { Match } from '@/types/Match'; // Adjust the import based on your project structure

const ProfilePage = () => {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;
    const audioRef = useRef<HTMLAudioElement>(null);

    // States
    const [user, setUser] = useState<User | null>(null);
    const [matches, setMatches] = useState<Match[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'matches' | 'friends'>('overview');
    const [relationshipLoading, setRelationshipLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                // In a real app, these would be API calls
                // Mock data for demonstration
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock user data
                setUser({
                    username: username,
                    displayName: username.charAt(0).toUpperCase() + username.slice(1),
                    avatar: `/images/default_pic.webp`,
                    bio: "Tetrix enthusiast since 2020. I love stacking blocks and making lines disappear! Diamond tier player with over 500 wins.",
                    rank: {
                        tier: 'Diamond',
                        points: 1250,
                        icon: '/images/Ranks/rank-diamond.webp'
                    },
                    stats: {
                        wins: 358,
                        losses: 212,
                        draws: 45,
                        winRate: 62.8
                    },
                    status: 'online',
                    isFriend: Math.random() > 0.5,
                    isBlocked: false,
                    isCurrentUser: username === 'myusername', // replace with actual auth check
                    currentSong: {
                        spotifyId: "https://open.spotify.com/embed/track/0QdNo0hthGtMENckZTiHe4?utm_source=generator"
                    }
                });

                // Mock match history
                const mockMatches = [
                    {
                        id: '1',
                        date: '2023-05-15T14:30:00Z',
                        opponent: 'player42',
                        opponentAvatar: '/images/default_pic.webp',
                        userScore: 10,
                        opponentScore: 8,
                        result: 'win',
                        gameStats: {
                            duration: '12:45',
                            linesCleared: 85,
                            tetrisCount: 7
                        }
                    },
                    {
                        id: '2',
                        date: '2023-05-12T18:15:00Z',
                        opponent: 'tetrixMaster',
                        opponentAvatar: '/images/default_pic.webp',
                        userScore: 6,
                        opponentScore: 10,
                        result: 'loss',
                        gameStats: {
                            duration: '10:15',
                            linesCleared: 62,
                            tetrisCount: 3
                        }
                    },
                    {
                        id: '3',
                        date: '2023-05-10T20:45:00Z',
                        opponent: 'blockBuilder',
                        opponentAvatar: '/images/default_pic.webp',
                        userScore: 10,
                        opponentScore: 9,
                        result: 'win',
                        gameStats: {
                            duration: '15:30',
                            linesCleared: 94,
                            tetrisCount: 8
                        }
                    }
                ] as Match[];

                setMatches(mockMatches);
                setSelectedMatch(mockMatches[0]);

                // Mock friends data
                setFriends([
                    {
                        id: '1',
                        username: 'tetrisKing',
                        displayName: 'Tetris King',
                        avatar: '/images/default_pic.webp',
                        status: 'online',
                        lastGame: '2 hours ago',
                        rank: {
                            tier: 'Silver',
                            icon: '/images/Ranks/rank-silver.webp'
                        }
                    },
                    {
                        id: '2',
                        username: 'blockmaster',
                        displayName: 'Block Master',
                        avatar: '/images/default_pic.webp',
                        status: 'offline',
                        lastGame: '2 days ago',
                        rank: {
                            tier: 'Gold',
                            icon: '/images/Ranks/rank-gold.webp'
                        }
                    },
                    {
                        id: '3',
                        username: 'tetrixPro',
                        displayName: 'Tetrix Pro',
                        avatar: '/images/default_pic.webp',
                        status: 'in-game',
                        lastGame: 'Now playing',
                        rank: {
                            tier: 'Diamond',
                            icon: '/images/Ranks/rank-platinud.webp'
                        }
                    },
                    {
                        id: '4',
                        username: 'puzzleQueen',
                        displayName: 'Puzzle Queen',
                        avatar: '/images/default_pic.webp',
                        status: 'online',
                        lastGame: '5 hours ago',
                        rank: {
                            tier: 'Master',
                            icon: '/images/Ranks/rank-grandmaster.webp'
                        }
                    }
                ]);
            } catch (err) {
                console.error(err);
                setError('Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserData();
        }
    }, [username]);



    // Handle friend request
    const handleFriendRequest = async () => {
        if (!user) return;

        setRelationshipLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));
            setUser(prev => prev ? { ...prev, isFriend: !prev.isFriend } : null);
        } catch (err) {
            console.error(err);
        } finally {
            setRelationshipLoading(false);
        }
    };

    // Handle block user
    const handleBlockUser = async () => {
        if (!user) return;

        setRelationshipLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));
            setUser(prev => prev ? { ...prev, isBlocked: !prev.isBlocked } : null);
        } catch (err) {
            console.error(err);
        } finally {
            setRelationshipLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-cyan-400 animate-pulse text-xl">Loading profile...</div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <div className="text-red-400 mb-4 text-xl">{error || 'User not found'}</div>
                <Link href="/" className="text-cyan-400 hover:text-cyan-300 bg-gray-800 px-6 py-2 rounded-full">
                    Return home
                </Link>
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

            {/* Spotify iframe (hidden) */}
            {user.currentSong && (
                <div className="fixed bottom-0 left-0 w-full z-50 bg-black/80 border-t border-cyan-500/20 p-2" style={{ display: isPlaying ? 'block' : 'none' }}>
                    <iframe
                        src={user.currentSong.spotifyId}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allowTransparency={true}
                        allow="encrypted-media"
                        loading="lazy"
                    ></iframe>
                </div>
            )}

            <div className="w-full max-w-6xl z-10 flex flex-col gap-8">
                {/* User profile header - Expanded */}
                <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left column - Profile pic and basic stats */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-6">
                            <div className="relative">
                                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-gradient-to-r from-cyan-500 to-purple-500 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/20">
                                    <Image
                                        src={user.avatar}
                                        alt={user.username}
                                        width={160}
                                        height={160}
                                        className="object-cover"
                                    />
                                </div>
                                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${user.status === 'online' ? 'bg-green-500' :
                                        user.status === 'in-game' ? 'bg-yellow-500' : 'bg-gray-500'
                                    } border-4 border-gray-900 text-xs text-white font-bold`}>
                                    {user.status === 'online' ? 'ON' :
                                        user.status === 'in-game' ? 'IG' : 'OFF'}
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col items-center">
                                <div className="relative w-40 h-40 mb-4">
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
                                    <div className="absolute inset-0 rounded-lg border-2 border-cyan-400/30 flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={user.rank.icon}
                                            alt={user.rank.tier}
                                            width={500}
                                            height={300}
                                            className="object-contain w-full h-full p-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                                        />
                                    </div>
                                </div>
                                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                                    {user.rank.tier}
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-800/80 px-3 py-1 rounded-full mt-1">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                    <span className="text-sm text-gray-300 font-medium">
                                        {user.rank.points} points
                                    </span>
                                </div>
                            </div>


                        </div>

                        {/* Right column - User details */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                                        {user.displayName}
                                    </h1>
                                    <p className="text-gray-400 text-lg">@{user.username}</p>
                                </div>

                                {/* Action buttons for non-current user */}
                                {!user.isCurrentUser && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleFriendRequest}
                                            disabled={relationshipLoading}
                                            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all disabled:opacity-50 ${
                                                user.isFriend 
                                                ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30' 
                                                : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white'
                                            }`}
                                        >
                                            {relationshipLoading ? (
                                                <span className="h-4 w-4 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></span>
                                            ) : user.isFriend ? (
                                                <FaUserMinus className="text-purple-300" />
                                            ) : (
                                                <FaUserPlus className="text-white" />
                                            )}
                                            {user.isFriend ? 'Friends' : 'Add Friend'}
                                        </button>

                                        <button
                                            onClick={handleBlockUser}
                                            disabled={relationshipLoading}
                                            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all disabled:opacity-50 ${
                                                user.isBlocked
                                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                        >
                                            {relationshipLoading ? (
                                                <span className="h-4 w-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin"></span>
                                            ) : user.isBlocked ? (
                                                <FaLockOpen className="text-red-400" />
                                            ) : (
                                                <FaLock className="text-gray-300" />
                                            )}
                                            {user.isBlocked ? 'Blocked' : 'Block'}
                                        </button>

                                        <button className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-sm font-medium transition-all flex items-center gap-2">
                                            <FaGamepad className="text-cyan-300" />
                                            Challenge
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Bio */}
                            <div className="mt-6 bg-gray-800/40 p-4 rounded-xl border border-gray-700">
                                <p className="text-gray-300">{user.bio}</p>
                            </div>

                            {/* Currently playing music with Spotify iframe */}
                            {user.currentSong && (
                                <div className="mt-6">

                                    <div className="bg-gray-800/40 p-3 rounded-xl">
                                        <iframe
                                            src={user.currentSong.spotifyId}
                                            width="100%"
                                            height="80"
                                            frameBorder="0"
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                            className="rounded-xl"
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Stats summary - Moved below the music section */}
                            <div className="mt-6 bg-gray-800/60 p-4 rounded-xl">
                                <h3 className="text-cyan-400 font-medium mb-3">Player Statistics</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="text-center p-2 bg-gray-800/70 rounded-lg">
                                        <div className="text-green-400 text-2xl font-bold">{user.stats.wins}</div>
                                        <div className="text-xs text-gray-400">Wins</div>
                                    </div>
                                    <div className="text-center p-2 bg-gray-800/70 rounded-lg">
                                        <div className="text-red-400 text-2xl font-bold">{user.stats.losses}</div>
                                        <div className="text-xs text-gray-400">Losses</div>
                                    </div>
                                    <div className="text-center p-2 bg-gray-800/70 rounded-lg">
                                        <div className="text-yellow-400 text-2xl font-bold">{user.stats.draws}</div>
                                        <div className="text-xs text-gray-400">Draws</div>
                                    </div>
                                    <div className="text-center p-2 bg-gray-800/70 rounded-lg">
                                        <div className="text-cyan-400 text-2xl font-bold">{user.stats.winRate}%</div>
                                        <div className="text-xs text-gray-400">Win Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Tabs navigation */}
                <div className="flex justify-center border-b border-cyan-500/30">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-3 font-medium flex items-center gap-2 ${activeTab === 'overview'
                                ? 'text-cyan-400 border-b-2 border-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        <FaGamepad /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('matches')}
                        className={`px-6 py-3 font-medium flex items-center gap-2 ${activeTab === 'matches'
                                ? 'text-cyan-400 border-b-2 border-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        <FaTrophy /> Match History
                    </button>
                    <button
                        onClick={() => setActiveTab('friends')}
                        className={`px-6 py-3 font-medium flex items-center gap-2 ${activeTab === 'friends'
                                ? 'text-cyan-400 border-b-2 border-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        <FaUserFriends /> Friends
                    </button>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent matches summary */}
                        <div className="lg:col-span-2 bg-gray-900/80 border border-cyan-500/20 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm">
                            <div className="border-b border-cyan-500/20 px-6 py-4 flex justify-between items-center">
                                <h3 className="text-cyan-400 font-medium">Recent Matches</h3>
                                <button
                                    onClick={() => setActiveTab('matches')}
                                    className="text-xs text-gray-400 hover:text-cyan-400"
                                >
                                    View all
                                </button>
                            </div>
                            <div className="p-4">
                                {matches.slice(0, 3).map(match => (
                                    <div key={match.id} className="flex items-center p-3 mb-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 transition-colors">
                                        <div className={`w-1.5 h-14 rounded-r-full mr-3 ${match.result === 'win' ? 'bg-green-500' :
                                                match.result === 'loss' ? 'bg-red-500' : 'bg-yellow-500'
                                            }`}></div>

                                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                            <Image
                                                src={match.opponentAvatar}
                                                alt={match.opponent}
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div className="font-medium text-white">{match.opponent}</div>
                                                <div className="text-sm text-gray-400">
                                                    {new Date(match.date).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <div className="flex items-center text-sm">
                                                <span className={`font-medium ${match.result === 'win' ? 'text-green-400' :
                                                        match.result === 'loss' ? 'text-red-400' : 'text-yellow-400'
                                                    }`}>
                                                    {match.result === 'win' ? 'Victory' :
                                                        match.result === 'loss' ? 'Defeat' : 'Draw'}
                                                </span>
                                                <span className="mx-2 text-gray-400">•</span>
                                                <span className="text-white font-bold">{match.userScore}</span>
                                                <span className="mx-1 text-gray-400">-</span>
                                                <span className="text-white font-bold">{match.opponentScore}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Friends summary */}
                        <div className="bg-gray-900/80 border border-cyan-500/20 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm">
                            <div className="border-b border-cyan-500/20 px-6 py-4 flex justify-between items-center">
                                <h3 className="text-cyan-400 font-medium">Friends</h3>
                                <button
                                    onClick={() => setActiveTab('friends')}
                                    className="text-xs text-gray-400 hover:text-cyan-400"
                                >
                                    View all
                                </button>
                            </div>
                            <div className="p-4">
                                {friends.slice(0, 4).map(friend => (
                                    <div key={friend.id} className="flex items-center p-3 mb-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 transition-colors">
                                        <div className="relative mr-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                                <Image
                                                    src={friend.avatar}
                                                    alt={friend.username}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ${friend.status === 'online' ? 'bg-green-500' :
                                                    friend.status === 'in-game' ? 'bg-yellow-500' : 'bg-gray-500'
                                                } border-2 border-gray-800`}></div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <div className="font-medium text-white">{friend.displayName}</div>
                                                <div className="ml-2">
                                                    <Image
                                                        src={friend.rank.icon}
                                                        alt={friend.rank.tier}
                                                        width={16}
                                                        height={16}
                                                    />
                                                </div>
                                            </div>

                                            <div className="text-xs text-gray-400">
                                                {friend.lastGame}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'matches' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Match list */}
                        <div className="bg-gray-900/80 border border-cyan-500/20 rounded-xl shadow-xl backdrop-blur-sm overflow-hidden">
                            <div className="border-b border-cyan-500/20 px-6 py-4">
                                <h3 className="text-cyan-400 font-medium">Match History</h3>
                            </div>

                            <div className="divide-y divide-cyan-500/10 max-h-[500px] overflow-y-auto">
                                {matches.length === 0 ? (
                                    <div className="p-8 text-center text-gray-400">
                                        No match history available
                                    </div>
                                ) : (
                                    matches.map(match => (
                                        <div
                                            key={match.id}
                                            className={`p-4 hover:bg-gray-800/50 transition-colors cursor-pointer ${selectedMatch?.id === match.id ? 'bg-gray-800/70 border-l-4 border-cyan-500' : ''
                                                }`}
                                            onClick={() => setSelectedMatch(match)}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-2 h-14 rounded-r-full mr-4 ${match.result === 'win' ? 'bg-green-500' :
                                                        match.result === 'loss' ? 'bg-red-500' : 'bg-yellow-500'
                                                    }`}></div>

                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <div className={`font-medium ${match.result === 'win' ? 'text-green-400' :
                                                                match.result === 'loss' ? 'text-red-400' : 'text-yellow-400'
                                                            }`}>
                                                            {match.result === 'win' ? 'Victory' :
                                                                match.result === 'loss' ? 'Defeat' : 'Draw'}
                                                        </div>
                                                        <div className="text-sm text-gray-400">
                                                            {new Date(match.date).toLocaleDateString()}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center mt-2">
                                                        <div className="flex items-center">
                                                            <span className="text-white text-xl font-bold">{match.userScore}</span>
                                                            <span className="mx-2 text-gray-500">vs</span>
                                                            <div className="flex items-center">
                                                                <span className="text-white text-xl font-bold mr-2">{match.opponentScore}</span>
                                                                <div className="w-6 h-6 rounded-full overflow-hidden">
                                                                    <Image
                                                                        src={match.opponentAvatar}
                                                                        alt={match.opponent}
                                                                        width={24}
                                                                        height={24}
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <span className="ml-1 text-sm text-purple-300">{match.opponent}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Match details */}
                        <div className="lg:col-span-2 bg-gray-900/80 border border-cyan-500/20 rounded-xl shadow-xl backdrop-blur-sm">
                            {selectedMatch ? (
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-white">Match Details</h3>
                                        <div className="text-sm text-gray-400">
                                            {new Date(selectedMatch.date).toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800/70 rounded-xl p-6 mb-6">
                                        <div className="flex flex-col items-center mb-4 md:mb-0">
                                            <div className="text-lg text-cyan-400 mb-1">{user.displayName}</div>
                                            <div className="w-20 h-20 rounded-xl overflow-hidden mb-2 border-2 border-cyan-500/30">
                                                <Image
                                                    src={user.avatar}
                                                    alt={user.username}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="text-3xl font-bold text-white">{selectedMatch.userScore}</div>
                                        </div>

                                        <div className="flex flex-col items-center mb-4 md:mb-0">
                                            <div className={`text-2xl font-bold px-6 py-2 rounded-full ${selectedMatch.result === 'win' ? 'bg-green-500/20 text-green-400' :
                                                    selectedMatch.result === 'loss' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {selectedMatch.result === 'win' ? 'VICTORY' :
                                                    selectedMatch.result === 'loss' ? 'DEFEAT' : 'DRAW'}
                                            </div>
                                            <div className="text-gray-400 mt-2">VS</div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className="text-lg text-purple-400 mb-1">{selectedMatch.opponent}</div>
                                            <div className="w-20 h-20 rounded-xl overflow-hidden mb-2 border-2 border-purple-500/30">
                                                <Image
                                                    src={selectedMatch.opponentAvatar}
                                                    alt={selectedMatch.opponent}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="text-3xl font-bold text-white">{selectedMatch.opponentScore}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                                            <div className="text-gray-400 text-sm mb-1">Duration</div>
                                            <div className="text-white text-xl font-medium">{selectedMatch.gameStats.duration}</div>
                                        </div>
                                        <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                                            <div className="text-gray-400 text-sm mb-1">Lines Cleared</div>
                                            <div className="text-white text-xl font-medium">{selectedMatch.gameStats.linesCleared}</div>
                                        </div>
                                        <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                                            <div className="text-gray-400 text-sm mb-1">Tetris Count</div>
                                            <div className="text-white text-xl font-medium">{selectedMatch.gameStats.tetrisCount}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-400">
                                    Select a match to view details
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'friends' && (
                    <div className="bg-gray-900/80 border border-cyan-500/20 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm">
                        <div className="border-b border-cyan-500/20 px-6 py-4">
                            <h3 className="text-cyan-400 font-medium">Friends ({friends.length})</h3>
                        </div>

                        {friends.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">
                                No friends added yet
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                                {friends.map(friend => (
                                    <Link key={friend.id} href={`/profile/${friend.username}`}>
                                        <div className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800/80 border border-cyan-500/10 hover:border-cyan-500/30 transition-all flex items-center gap-4 cursor-pointer">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-700">
                                                    <Image
                                                        src={friend.avatar}
                                                        alt={friend.username}
                                                        width={56}
                                                        height={56}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${friend.status === 'online' ? 'bg-green-500' :
                                                        friend.status === 'in-game' ? 'bg-yellow-500' : 'bg-gray-500'
                                                    } border-2 border-gray-800`}></div>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    <div className="font-medium text-white">{friend.displayName}</div>
                                                    <div className="ml-2">
                                                        <Image
                                                            src={friend.rank.icon}
                                                            alt={friend.rank.tier}
                                                            width={16}
                                                            height={16}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">@{friend.username}</div>
                                                <div className={`text-xs mt-1 ${friend.status === 'online' ? 'text-green-400' :
                                                        friend.status === 'in-game' ? 'text-yellow-400' : 'text-gray-400'
                                                    }`}>
                                                    {friend.status === 'online' ? 'Online' :
                                                        friend.status === 'in-game' ? 'In Game' : 'Offline'}
                                                </div>
                                            </div>

                                            <div className="text-cyan-400 hover:text-cyan-300">
                                                View
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;