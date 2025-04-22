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
                    <div className="relative inline-block">
                        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 filter drop-shadow-lg">
                            TETRIX MANUAL
                        </h1>
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>
                    </div>
                    <p className="text-xl mt-8 text-gray-300 max-w-3xl mx-auto font-light tracking-wide">
                        <span className="text-cyan-400">&#47;&#47;</span> MASTER THE GRID AND DOMINATE YOUR OPPONENTS
                    </p>
                </motion.div>

                <div className="space-y-8">
                <motion.section 
    className="bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
>
                        <h2 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">System Protocols</h2>
                        <p className="text-gray-300 mb-2">Tetris is a puzzle game where you arrange falling blocks (tetrominoes) to create complete horizontal lines without gaps.</p>
                        <p className="text-gray-300">When you complete a line, it disappears and you earn points. The game ends when the blocks stack up to the top of the playing field.</p>
                    </motion.section>

                    <motion.section 
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">Interface Commands</h2>
                        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 max-w-md mx-auto">
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="flex items-center justify-center">
                                    <span className="bg-gray-800 text-cyan-400 w-12 h-12 rounded-md flex items-center justify-center font-mono text-lg border border-gray-600 shadow-inner hover:bg-gray-700 transition-colors">Z</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="bg-gray-800 text-cyan-400 w-12 h-12 rounded-md flex items-center justify-center font-mono text-lg border border-gray-600 shadow-inner hover:bg-gray-700 transition-colors">↑</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="bg-gray-800 text-cyan-400 w-12 h-12 rounded-md flex items-center justify-center font-mono text-lg border border-gray-600 shadow-inner hover:bg-gray-700 transition-colors">C</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="flex items-center justify-center">
                                    <span className="bg-gray-800 text-cyan-400 w-12 h-12 rounded-md flex items-center justify-center font-mono text-lg border border-gray-600 shadow-inner hover:bg-gray-700 transition-colors">←</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="bg-gray-800 text-cyan-400 w-12 h-12 rounded-md flex items-center justify-center font-mono text-lg border border-gray-600 shadow-inner hover:bg-gray-700 transition-colors">↓</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="bg-gray-800 text-cyan-400 w-12 h-12 rounded-md flex items-center justify-center font-mono text-lg border border-gray-600 shadow-inner hover:bg-gray-700 transition-colors">→</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="flex items-center justify-center">
                                    <span className="bg-gray-800 text-cyan-400 w-full h-12 rounded-md flex items-center justify-center font-mono text-lg border border-gray-600 shadow-inner hover:bg-gray-700 transition-colors">Space</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-cyan-400 font-mono">←</span>
                                <span className="text-gray-300">Move Left</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-cyan-400 font-mono">→</span>
                                <span className="text-gray-300">Move Right</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-cyan-400 font-mono">↓</span>
                                <span className="text-gray-300">Soft Drop</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-cyan-400 font-mono">Space</span>
                                <span className="text-gray-300">Hard Drop</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-cyan-400 font-mono">↑</span>
                                <span className="text-gray-300">Rotate Clockwise</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-cyan-400 font-mono">Z</span>
                                <span className="text-gray-300">Rotate Counter-clockwise</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-cyan-400 font-mono">C</span>
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
                        <h2 className="text-2xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">Block Units</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="flex flex-col items-center">
                                <div className="mb-2 transform transition-transform hover:scale-110">
                                    <div className="grid grid-cols-4 gap-0.5">
                                        <div className="w-4 h-4 bg-cyan-400"></div>
                                        <div className="w-4 h-4 bg-cyan-400"></div>
                                        <div className="w-4 h-4 bg-cyan-400"></div>
                                        <div className="w-4 h-4 bg-cyan-400"></div>
                                    </div>
                                </div>
                                <span className="text-gray-300">I-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-2 transform transition-transform hover:scale-110">
                                    <div className="grid grid-cols-3 gap-0.5">
                                        <div className="w-4 h-4"></div>
                                        <div className="w-4 h-4 bg-purple-500"></div>
                                        <div className="w-4 h-4"></div>
                                        <div className="w-4 h-4 bg-purple-500"></div>
                                        <div className="w-4 h-4 bg-purple-500"></div>
                                        <div className="w-4 h-4 bg-purple-500"></div>
                                    </div>
                                </div>
                                <span className="text-gray-300">T-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-2 transform transition-transform hover:scale-110">
                                    <div className="grid grid-cols-2 gap-0.5">
                                        <div className="w-4 h-4 bg-yellow-400"></div>
                                        <div className="w-4 h-4 bg-yellow-400"></div>
                                        <div className="w-4 h-4 bg-yellow-400"></div>
                                        <div className="w-4 h-4 bg-yellow-400"></div>
                                    </div>
                                </div>
                                <span className="text-gray-300">O-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-2 transform transition-transform hover:scale-110">
                                    <div className="grid grid-cols-3 gap-0.5">
                                        <div className="w-4 h-4"></div>
                                        <div className="w-4 h-4"></div>
                                        <div className="w-4 h-4 bg-orange-500"></div>
                                        <div className="w-4 h-4 bg-orange-500"></div>
                                        <div className="w-4 h-4 bg-orange-500"></div>
                                        <div className="w-4 h-4 bg-orange-500"></div>
                                    </div>
                                </div>
                                <span className="text-gray-300">L-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-2 transform transition-transform hover:scale-110">
                                    <div className="grid grid-cols-3 gap-0.5">
                                        <div className="w-4 h-4 bg-blue-500"></div>
                                        <div className="w-4 h-4"></div>
                                        <div className="w-4 h-4"></div>
                                        <div className="w-4 h-4 bg-blue-500"></div>
                                        <div className="w-4 h-4 bg-blue-500"></div>
                                        <div className="w-4 h-4 bg-blue-500"></div>
                                    </div>
                                </div>
                                <span className="text-gray-300">J-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-2 transform transition-transform hover:scale-110">
                                    <div className="grid grid-cols-3 gap-0.5">
                                        <div className="w-4 h-4"></div>
                                        <div className="w-4 h-4 bg-green-500"></div>
                                        <div className="w-4 h-4 bg-green-500"></div>
                                        <div className="w-4 h-4 bg-green-500"></div>
                                        <div className="w-4 h-4 bg-green-500"></div>
                                        <div className="w-4 h-4"></div>
                                    </div>
                                </div>
                                <span className="text-gray-300">S-Piece</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-2 transform transition-transform hover:scale-110">
                                    <div className="grid grid-cols-3 gap-0.5">
                                        <div className="w-4 h-4 bg-red-500"></div>
                                        <div className="w-4 h-4 bg-red-500"></div>
                                        <div className="w-4 h-4"></div>
                                        <div className="w-4 h-4"></div>
                                        <div className="w-4 h-4 bg-red-500"></div>
                                        <div className="w-4 h-4 bg-red-500"></div>
                                    </div>
                                </div>
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
                        <h2 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">Achievement Matrix</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-cyan-300 font-mono">SINGLE</span>
                                    <span className="text-cyan-400 font-mono text-lg">100</span>
                                </div>
                                <div className="h-1 w-full bg-gray-700">
                                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-1/4"></div>
                                </div>
                            </div>
                            <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-cyan-300 font-mono">DOUBLE</span>
                                    <span className="text-cyan-400 font-mono text-lg">300</span>
                                </div>
                                <div className="h-1 w-full bg-gray-700">
                                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-2/5"></div>
                                </div>
                            </div>
                            <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-cyan-300 font-mono">TRIPLE</span>
                                    <span className="text-cyan-400 font-mono text-lg">500</span>
                                </div>
                                <div className="h-1 w-full bg-gray-700">
                                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-3/5"></div>
                                </div>
                            </div>
                            <div className="bg-gray-900 p-3 rounded-lg border border-cyan-700">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-cyan-300 font-mono">TETRIS</span>
                                    <span className="text-cyan-400 font-mono text-lg">800</span>
                                </div>
                                <div className="h-1 w-full bg-gray-700">
                                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-4/5"></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-300 mt-4">The system will increase velocity as your score rises, creating progressive challenge levels!</p>
                    </motion.section>

                    <motion.section 
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">Combat Tactics</h2>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <div className="text-cyan-400 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-300">Complete multiple lines simultaneously to deploy "garbage lines" against opponents</p>
                            </div>
                            <div className="flex items-start">
                                <div className="text-cyan-400 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-300">Utilize the hold function strategically to reserve blocks for critical moments</p>
                            </div>
                            <div className="flex items-start">
                                <div className="text-cyan-400 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-300">Analyze upcoming piece queue for tactical advantage planning</p>
                            </div>
                            <div className="flex items-start">
                                <div className="text-cyan-400 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-300">Master T-spin maneuvers for enhanced offense against adversaries</p>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    );
};

export default HowToPlay;