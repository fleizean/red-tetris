'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaGamepad, FaLock, FaUnlock, FaUsers, FaTimes, FaCheck } from 'react-icons/fa';

const CreateRoomPage = () => {
    const router = useRouter();
    const [roomName, setRoomName] = useState('');
    const [roomMode, setRoomMode] = useState<'casual' | 'ranked' | 'tournament'>('casual');
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!roomName.trim()) {
            setError('Room name is required');
            return;
        }

        if (isPrivate && !password.trim()) {
            setError('Password is required for private rooms');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real app, you would send this data to your API
            const roomData = {
                name: roomName,
                mode: roomMode,
                isPrivate,
                password: isPrivate ? password : null,
                maxPlayers
            };

            console.log('Room created:', roomData);
            
            // Redirect to the room or room list
            router.push('/rooms'); // Adjust to the actual route
        } catch (err) {
            console.error(err);
            setError('Failed to create room. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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

            <div className="w-full max-w-2xl z-10 flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 text-center">
                        Create New Room
                    </h1>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto">
                        Set up your game room and invite friends to play Tetrix.
                    </p>
                </div>

                {/* Create room form */}
                <form 
                    onSubmit={handleSubmit}
                    className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-8 shadow-xl backdrop-blur-sm"
                >
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                            {error}
                        </div>
                    )}

                    {/* Room name */}
                    <div className="mb-6">
                        <label htmlFor="roomName" className="block text-cyan-400 mb-2 font-medium">
                            Room Name
                        </label>
                        <input
                            type="text"
                            id="roomName"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder="Enter a name for your room"
                            className="w-full bg-gray-800/70 text-white placeholder-gray-400 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                            maxLength={30}
                        />
                        <div className="mt-1 text-right text-gray-500 text-sm">
                            {roomName.length}/30
                        </div>
                    </div>

                    {/* Game mode */}
                    <div className="mb-6">
                        <label className="block text-cyan-400 mb-2 font-medium">Game Mode</label>
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                type="button"
                                onClick={() => setRoomMode('casual')}
                                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                                    roomMode === 'casual'
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                <FaGamepad className="text-2xl mb-2" />
                                <span>Casual</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRoomMode('ranked')}
                                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                                    roomMode === 'ranked'
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                <FaGamepad className="text-2xl mb-2" />
                                <span>Ranked</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRoomMode('tournament')}
                                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                                    roomMode === 'tournament'
                                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                <FaGamepad className="text-2xl mb-2" />
                                <span>Tournament</span>
                            </button>
                        </div>
                    </div>

                    {/* Max Players */}
                    <div className="mb-6">
                        <label className="block text-cyan-400 mb-2 font-medium">
                            Max Players: {maxPlayers}
                        </label>
                        <input
                            type="range"
                            min="2"
                            max="8"
                            value={maxPlayers}
                            onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between mt-1 text-gray-400 text-sm">
                            <span>2</span>
                            <span>4</span>
                            <span>6</span>
                            <span>8</span>
                        </div>
                    </div>

                    {/* Room Privacy */}
                    <div className="mb-6">
                        <label className="block text-cyan-400 mb-2 font-medium">Room Privacy</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setIsPrivate(false)}
                                className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all ${
                                    !isPrivate
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                <FaUnlock className="text-xl" />
                                <span>Public</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsPrivate(true)}
                                className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all ${
                                    isPrivate
                                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                <FaLock className="text-xl" />
                                <span>Private</span>
                            </button>
                        </div>
                    </div>

                    {/* Password (if private) */}
                    {isPrivate && (
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-cyan-400 mb-2 font-medium">
                                Room Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter a password"
                                className="w-full bg-gray-800/70 text-white placeholder-gray-400 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                            />
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-4 mt-8">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-6 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 font-medium transition-all flex items-center justify-center gap-2"
                        >
                            <FaTimes /> Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <FaCheck />
                            )}
                            Create Room
                        </button>
                    </div>
                </form>

                {/* Room preview */}
                <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                    <h3 className="text-cyan-400 font-medium mb-4">Room Preview</h3>
                    <div className="p-4 border border-gray-700 rounded-lg">
                        <div className="flex items-center">
                            <div className={`w-3 h-14 rounded-r-full bg-green-500 mr-4`}></div>
                            <div className="flex-grow">
                                <div className="flex items-center">
                                    <h3 className="text-xl font-medium text-white">{roomName || "Your Room Name"}</h3>
                                    {isPrivate && <FaLock className="ml-2 text-yellow-400" title="Private Room" />}
                                </div>
                                <div className="flex items-center gap-4 mt-1">
                                    <div className="flex items-center text-gray-400 text-sm">
                                        <FaGamepad className="mr-1" />
                                        <span className={`
                                            ${roomMode === 'casual' ? 'text-green-400' : 
                                                roomMode === 'ranked' ? 'text-cyan-400' : 'text-purple-400'}
                                        `}>
                                            {roomMode.charAt(0).toUpperCase() + roomMode.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-400 text-sm">
                                        <FaUsers className="mr-1" />
                                        <span className="text-white">0/{maxPlayers}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRoomPage;