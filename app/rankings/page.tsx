'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCrown, FaMedal, FaSearch, FaFilter } from 'react-icons/fa';

type RankedPlayer = {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    rank: {
        tier: string;
        points: number;
        icon: string;
    };
    stats: {
        wins: number;
        losses: number;
        winRate: number;
    };
    position: number;
};

const tiers = [
    { name: 'Grand Master', color: 'from-red-500 to-yellow-500', icon: '/images/Ranks/rank-grandmaster.webp' },
    { name: 'Diamond', color: 'from-blue-400 to-cyan-400', icon: '/images/Ranks/rank-diamond.webp' },
    { name: 'Platinum', color: 'from-cyan-400 to-teal-400', icon: '/images/Ranks/rank-platinud.webp' },
    { name: 'Gold', color: 'from-yellow-400 to-amber-500', icon: '/images/Ranks/rank-gold.webp' },
    { name: 'Silver', color: 'from-gray-300 to-gray-400', icon: '/images/Ranks/rank-silver.webp' },
    { name: 'Bronze', color: 'from-amber-700 to-yellow-700', icon: '/images/Ranks/rank-bronze.webp' }
];

const RankingsPage = () => {
    const [players, setPlayers] = useState<RankedPlayer[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTier, setActiveTier] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'points' | 'winRate'>('points');

    useEffect(() => {
        const fetchRankings = async () => {
            setLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1200));
                
                // Mock data for demonstration
                const mockPlayers: RankedPlayer[] = [];
                
                // Generate players for each tier
                tiers.forEach((tier, tierIndex) => {
                    const playersCount = 20 - tierIndex * 2; // Higher tiers have fewer players
                    
                    for (let i = 0; i < playersCount; i++) {
                        const position = mockPlayers.length + 1;
                        const wins = Math.floor(Math.random() * 500) + 100;
                        const losses = Math.floor(Math.random() * 300) + 50;
                        
                        mockPlayers.push({
                            id: `player-${tier.name.toLowerCase()}-${i}`,
                            username: `player${position}`,
                            displayName: `Player ${position}`,
                            avatar: `/images/default_pic.webp`,
                            rank: {
                                tier: tier.name,
                                points: 3000 - (tierIndex * 500) - (Math.floor(Math.random() * 300)),
                                icon: tier.icon
                            },
                            stats: {
                                wins: wins,
                                losses: losses,
                                winRate: Math.round((wins / (wins + losses)) * 100)
                            },
                            position: position
                        });
                    }
                });
                
                // Sort by rank points
                mockPlayers.sort((a, b) => b.rank.points - a.rank.points);
                
                // Update positions after sorting
                mockPlayers.forEach((player, index) => {
                    player.position = index + 1;
                });
                
                setPlayers(mockPlayers);
            } catch (error) {
                console.error('Error fetching rankings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRankings();
    }, []);

    // Filter players based on active tier and search term
    const filteredPlayers = players.filter(player => {
        const matchesTier = activeTier === 'all' || player.rank.tier.toLowerCase() === activeTier.toLowerCase();
        const matchesSearch = player.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                                 player.displayName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTier && matchesSearch;
    });

    // Sort players
    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
        if (sortOrder === 'points') {
            return b.rank.points - a.rank.points;
        } else {
            return b.stats.winRate - a.stats.winRate;
        }
    });

    return (
        <div className="min-h-screen bg-black flex flex-col items-center py-8 px-4 relative">
            {/* Futuristic background */}
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
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                        Global Rankings
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Compete against the best Tetrix players worldwide. Climb the ranks, improve your skills, and become a legend.
                    </p>
                </div>

                {/* Tier Selector and Search */}
                <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col space-y-4">
                        {/* Tier filter buttons */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveTier('all')}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeTier === 'all' 
                                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20' 
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                All Tiers
                            </button>
                            
                            <div className="flex flex-wrap gap-2">
                                {tiers.map((tier) => (
                                    <button
                                        key={tier.name}
                                        onClick={() => setActiveTier(tier.name)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                                            activeTier === tier.name 
                                                ? `bg-gradient-to-r ${tier.color} text-white shadow-lg shadow-cyan-500/20` 
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        <div className="relative w-5 h-5 flex-shrink-0">
                                            <Image 
                                                src={tier.icon} 
                                                alt={tier.name} 
                                                layout="fill" 
                                                className="object-contain"
                                            />
                                        </div>
                                        <span>{tier.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search and Sort */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-grow">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search players..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 w-full"
                                />
                            </div>
                            
                            <button 
                                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg px-4 py-2.5 text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-cyan-700/20"
                                onClick={() => setSortOrder(sortOrder === 'points' ? 'winRate' : 'points')}
                            >
                                <FaFilter className="text-white/80" />
                                <span className="font-medium">Sort by: {sortOrder === 'points' ? 'Points' : 'Win Rate'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rankings Table */}
                <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                    {loading ? (
                        <div className="flex justify-center items-center p-12">
                            <div className="text-cyan-400 animate-pulse text-xl">Loading rankings...</div>
                        </div>
                    ) : sortedPlayers.length === 0 ? (
                        <div className="text-center p-12">
                            <p className="text-gray-400">No players found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-800/50 border-b border-cyan-500/20">
                                        <th className="px-4 py-3 text-left text-gray-400 font-medium">Rank</th>
                                        <th className="px-4 py-3 text-left text-gray-400 font-medium">Player</th>
                                        <th className="px-4 py-3 text-left text-gray-400 font-medium">Tier</th>
                                        <th className="px-4 py-3 text-right text-gray-400 font-medium">Points</th>
                                        <th className="px-4 py-3 text-right text-gray-400 font-medium">Wins</th>
                                        <th className="px-4 py-3 text-right text-gray-400 font-medium">Losses</th>
                                        <th className="px-4 py-3 text-right text-gray-400 font-medium">Win Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/50">
                                    {sortedPlayers.map((player, index) => (
                                        <tr 
                                            key={player.id} 
                                            className="hover:bg-gray-800/30 transition-colors"
                                        >
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {index === 0 && (
                                                        <FaCrown className="text-yellow-400 mr-2" />
                                                    )}
                                                    {index === 1 && (
                                                        <FaMedal className="text-gray-300 mr-2" />
                                                    )}
                                                    {index === 2 && (
                                                        <FaMedal className="text-amber-600 mr-2" />
                                                    )}
                                                    <span className={`
                                                        font-bold text-lg
                                                        ${index === 0 ? 'text-yellow-400' : ''}
                                                        ${index === 1 ? 'text-gray-300' : ''}
                                                        ${index === 2 ? 'text-amber-600' : ''}
                                                        ${index > 2 ? 'text-white' : ''}
                                                    `}>
                                                        {player.position}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <Link href={`/profile/${player.username}`} className="flex items-center group">
                                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-700 mr-3">
                                                        <Image
                                                            src={player.avatar}
                                                            alt={player.displayName}
                                                            width={40}
                                                            height={40}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                                                            {player.displayName}
                                                        </div>
                                                        <div className="text-sm text-gray-400">@{player.username}</div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="relative w-8 h-8">
                                                        <Image
                                                            src={player.rank.icon}
                                                            alt={player.rank.tier}
                                                            layout="fill"
                                                            className="object-contain drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]"
                                                        />
                                                    </div>
                                                    <span className={`
                                                        text-sm font-medium
                                                        ${player.rank.tier === 'Grand Master' ? 'text-gradient bg-gradient-to-r from-red-500 to-yellow-500' : ''}
                                                        ${player.rank.tier === 'Diamond' ? 'text-cyan-400' : ''}
                                                        ${player.rank.tier === 'Platinum' ? 'text-teal-400' : ''}
                                                        ${player.rank.tier === 'Gold' ? 'text-yellow-400' : ''}
                                                        ${player.rank.tier === 'Silver' ? 'text-gray-300' : ''}
                                                        ${player.rank.tier === 'Bronze' ? 'text-amber-700' : ''}
                                                    `}>
                                                        {player.rank.tier}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-right whitespace-nowrap font-medium text-white">
                                                {player.rank.points.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-4 text-right whitespace-nowrap text-green-400 font-medium">
                                                {player.stats.wins.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-4 text-right whitespace-nowrap text-red-400 font-medium">
                                                {player.stats.losses.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-4 text-right whitespace-nowrap">
                                                <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-medium">
                                                    {player.stats.winRate}%
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Tier Explanations */}
                <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">Rank Tiers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {tiers.map((tier) => (
                            <div key={tier.name} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="relative w-12 h-12">
                                        <Image
                                            src={tier.icon}
                                            alt={tier.name}
                                            layout="fill"
                                            className="object-contain drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]"
                                        />
                                    </div>
                                    <h3 className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${tier.color}`}>
                                        {tier.name}
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    {tier.name === 'Grand Master' && "The most elite players. Only the top players can achieve this prestigious rank."}
                                    {tier.name === 'Diamond' && "Exceptional players with excellent strategic thinking and mechanical skills."}
                                    {tier.name === 'Platinum' && "Skilled players who understand advanced techniques and strategies."}
                                    {tier.name === 'Gold' && "Above average players with good understanding of the game."}
                                    {tier.name === 'Silver' && "Experienced players who have developed basic strategies."}
                                    {tier.name === 'Bronze' && "New players who are still learning the game basics."}
                                </p>
                                <div className="mt-2 text-xs text-gray-500">
                                    {tier.name === 'Grand Master' && "2500+ points"}
                                    {tier.name === 'Diamond' && "2100-2499 points"}
                                    {tier.name === 'Platinum' && "1800-2099 points"}
                                    {tier.name === 'Gold' && "1500-1799 points"}
                                    {tier.name === 'Silver' && "1200-1499 points"}
                                    {tier.name === 'Bronze' && "0-1199 points"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RankingsPage;