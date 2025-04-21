"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FeaturePage = () => {
    const features = [
        {
            title: 'Multiplayer Battles',
            description: 'Challenge friends in real-time multiplayer battles. Send and receive attack lines to increase the difficulty for your opponents.',
            icon: '🎮',
        },
        {
            title: 'Classic Tetris Gameplay',
            description: 'Enjoy the timeless Tetris mechanics with smooth controls and responsive tetromino movement.',
            icon: '🧩',
        },
        {
            title: 'Global Leaderboard',
            description: 'Compete for the highest score and climb the global rankings. Show off your Tetris skills to the world.',
            icon: '🏆',
        },
        {
            title: 'Custom Game Rooms',
            description: 'Create private rooms with custom settings to play with friends or join public matches to meet new challengers.',
            icon: '🚪',
        },
        {
            title: 'Different Game Modes',
            description: 'Experience various game modes including sprint, marathon, and battle royale style competitions.',
            icon: '🔄',
        },
        {
            title: 'Cross-Platform Play',
            description: 'Play seamlessly across different devices with our responsive design and synchronized gameplay.',
            icon: '📱',
        },
    ];

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen py-16 text-white" id="about">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        Game Features
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover what makes Red Tetris a unique and exciting multiplayer experience.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300 group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturePage;