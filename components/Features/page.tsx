"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaPuzzlePiece, FaTrophy, FaDoorOpen, FaSyncAlt, FaMobile } from 'react-icons/fa';

const FeaturePage = () => {
    const features = [
        {
            title: 'Multiplayer Battles',
            description: 'Challenge friends in real-time multiplayer battles. Send and receive attack lines to increase the difficulty for your opponents.',
            icon: <FaGamepad className="text-cyan-400" />,
        },
        {
            title: 'Classic Tetris Gameplay',
            description: 'Enjoy the timeless Tetris mechanics with smooth controls and responsive tetromino movement.',
            icon: <FaPuzzlePiece className="text-cyan-400" />,
        },
        {
            title: 'Global Leaderboard',
            description: 'Compete for the highest score and climb the global rankings. Show off your Tetris skills to the world.',
            icon: <FaTrophy className="text-cyan-400" />,
        },
        {
            title: 'Custom Game Rooms',
            description: 'Create private rooms with custom settings to play with friends or join public matches to meet new challengers.',
            icon: <FaDoorOpen className="text-cyan-400" />,
        },
        {
            title: 'Different Game Modes',
            description: 'Experience various game modes including sprint, marathon, and battle royale style competitions.',
            icon: <FaSyncAlt className="text-cyan-400" />,
        },
        {
            title: 'Cross-Platform Play',
            description: 'Play seamlessly across different devices with our responsive design and synchronized gameplay.',
            icon: <FaMobile className="text-cyan-400" />,
        },
    ];

    return (
        <div className="bg-gradient-to-b from-gray-900 to-[#052857] min-h-screen pt-32 pb-16 text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="relative inline-block">
                        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 filter drop-shadow-lg">
                            GAME FEATURES
                        </h1>
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>
                    </div>
                    <p className="text-xl mt-8 text-gray-300 max-w-3xl mx-auto font-light tracking-wide">
                        <span className="text-cyan-400">&#47;&#47;</span> DISCOVER WHAT MAKES RED TETRIS A UNIQUE MULTIPLAYER EXPERIENCE
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {features.map((feature, index) => (
                        <motion.section 
                            key={index}
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 * index, duration: 0.5 }}
                        >
                            <div className="flex items-start">
                                <div className="text-5xl mr-6 text-cyan-400">{feature.icon}</div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">
                                        {feature.title}
                                    </h2>
                                    <p className="text-gray-300">{feature.description}</p>
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturePage;
