"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HowToPlay: React.FC = () => {
    return (
        <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen py-16 text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        How To Play
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Master the basics and become a Tetris champion
                    </p>
                </motion.div>

                <div className="space-y-8">
                    <motion.section 
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-3 text-cyan-400">Basic Rules</h2>
                        <p className="text-gray-300 mb-2">Tetris is a puzzle game where you arrange falling blocks (tetrominoes) to create complete horizontal lines without gaps.</p>
                        <p className="text-gray-300">When you complete a line, it disappears and you earn points. The game ends when the blocks stack up to the top of the playing field.</p>
                    </motion.section>

                    <motion.section 
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-3 text-cyan-400">Controls</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-3">
                                <span className="bg-gray-700 text-cyan-400 px-3 py-1 rounded font-mono">←</span>
                                <span className="text-gray-300">Move Left</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="bg-gray-700 text-cyan-400 px-3 py-1 rounded font-mono">→</span>
                                <span className="text-gray-300">Move Right</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="bg-gray-700 text-cyan-400 px-3 py-1 rounded font-mono">↓</span>
                                <span className="text-gray-300">Soft Drop</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="bg-gray-700 text-cyan-400 px-3 py-1 rounded font-mono">Space</span>
                                <span className="text-gray-300">Hard Drop</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="bg-gray-700 text-cyan-400 px-3 py-1 rounded font-mono">↑</span>
                                <span className="text-gray-300">Rotate Clockwise</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="bg-gray-700 text-cyan-400 px-3 py-1 rounded font-mono">Z</span>
                                <span className="text-gray-300">Rotate Counter-clockwise</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="bg-gray-700 text-cyan-400 px-3 py-1 rounded font-mono">C</span>
                                <span className="text-gray-300">Hold Piece</span>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section 
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-3 text-cyan-400">Tetromino Shapes</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-cyan-400 mb-2 transform transition-transform hover:scale-110"></div>
                                <span className="text-gray-300">I-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-purple-500 mb-2 transform transition-transform hover:scale-110"></div>
                                <span className="text-gray-300">T-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-yellow-400 mb-2 transform transition-transform hover:scale-110"></div>
                                <span className="text-gray-300">O-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-orange-500 mb-2 transform transition-transform hover:scale-110"></div>
                                <span className="text-gray-300">L-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-blue-500 mb-2 transform transition-transform hover:scale-110"></div>
                                <span className="text-gray-300">J-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-500 mb-2 transform transition-transform hover:scale-110"></div>
                                <span className="text-gray-300">S-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-red-500 mb-2 transform transition-transform hover:scale-110"></div>
                                <span className="text-gray-300">Z-Piece</span>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section 
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-3 text-cyan-400">Scoring</h2>
                        <ul className="list-disc pl-5 mb-3 text-gray-300 space-y-1">
                            <li><span className="font-semibold text-cyan-300">1 Line:</span> 100 points</li>
                            <li><span className="font-semibold text-cyan-300">2 Lines:</span> 300 points</li>
                            <li><span className="font-semibold text-cyan-300">3 Lines:</span> 500 points</li>
                            <li><span className="font-semibold text-cyan-300">4 Lines (Tetris):</span> 800 points</li>
                        </ul>
                        <p className="text-gray-300">The game speeds up as your score increases, making it progressively more challenging!</p>
                    </motion.section>

                    <motion.section 
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-3 text-cyan-400">Multiplayer Tips</h2>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                            <li>Complete multiple lines at once to send "garbage lines" to your opponent</li>
                            <li>Use the hold feature strategically to save pieces for later</li>
                            <li>Plan ahead by looking at the next pieces queue</li>
                            <li>Practice T-spins for bonus attacks against opponents</li>
                        </ul>
                    </motion.section>
                </div>
            </div>
        </div>
    );
};

export default HowToPlay;