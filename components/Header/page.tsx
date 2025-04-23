"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TextScramble from '../TextScramble/page';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const [scrambleUsername, setScrambleUsername] = useState(0);

    // Function to trigger username scramble manually on hover
    const triggerUsernameScramble = () => {
        setScrambleUsername(prev => prev + 1);
    };

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        
        // Set up automatic scrambling intervals
        const usernameInterval = setInterval(() => {
            setScrambleUsername(prev => prev + 1);
        }, 10000); // Slowed down to every 15 seconds for username
        
        // Clean up intervals on component unmount
        return () => {
            clearInterval(usernameInterval);
        };
    }, []);

    return (
        <header className="bg-gray-900/95 backdrop-blur-sm text-white py-4 px-6 border-b border-cyan-600/20 sticky top-0 z-50">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="group">
                        <div className="text-3xl font-bold tracking-tight relative overflow-hidden">
                            <span className="font-mono tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                                TETRIX
                            </span>
                        </div>
                    </Link>
                
                    <nav className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <NavLink href="/play" label="PLAY" />
                                <NavLink href="/leaderboard" label="RANKINGS" />
                                <div className="relative group">
                                    <button 
                                        className="flex items-center px-4 py-1.5 rounded-sm bg-cyan-900/30 border-2 border-cyan-600/70 
                                        hover:border-cyan-400 transition-all duration-300 text-cyan-300 hover:text-cyan-100 
                                        text-sm font-mono tracking-wide shadow-[0_0_10px_rgba(8,145,178,0.3)]"
                                    >
                                        <span className="mr-2">PROFILE</span>
                                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/50 overflow-hidden flex items-center justify-center">
                                            <Image
                                                src="/images/default_pic.webp"
                                                alt="Profile"
                                                width={24}
                                                height={24}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </button>
                                    
                                    <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                    transition-all duration-300 bg-gray-900/95 backdrop-blur-md border border-cyan-800/50 
                                    rounded-md shadow-lg shadow-cyan-900/30 z-[60]">
                                        <div className="p-4">
                                            <Link href="/profile" className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 rounded-full bg-cyan-800/30 border border-cyan-500/40 overflow-hidden flex items-center justify-center">
                                                        <Image
                                                            src="/images/default_pic.webp"
                                                            alt="Profile"
                                                            width={48}
                                                            height={48}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="text-cyan-100 font-black text-lg"
                                                            onMouseEnter={triggerUsernameScramble}
                                                        >
                                                            <TextScramble 
                                                                text="fleizean" 
                                                                className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
                                                                
                                                                key={scrambleUsername}
                                                            />
                                                        </div>
                                                        <div className="text-xs text-cyan-400 flex items-center">
                                                            Enes Yağız
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="mt-3 pt-3 border-t border-cyan-800/40">
                                                <Link href="/profile/history" className="flex items-center w-full px-4 py-2 my-1 rounded-sm bg-cyan-900/20 hover:bg-cyan-900/40 border border-transparent hover:border-gray-600/70 transition-all duration-300 text-gray-300 hover:text-gray-100 text-sm font-mono tracking-wide">
                                                    MATCH HISTORY
                                                </Link>
                                                <Link href="/profile/friends" className="flex items-center w-full px-4 py-2 my-1 rounded-sm bg-cyan-900/20 hover:bg-cyan-900/40 border border-transparent hover:border-gray-600/70 transition-all duration-300 text-gray-300 hover:text-gray-100 text-sm font-mono tracking-wide">
                                                    FRIENDS
                                                </Link>
                                                <Link href="/profile/settings" className="flex items-center w-full px-4 py-2 my-1 rounded-sm bg-cyan-900/20 hover:bg-cyan-900/40 border border-transparent hover:border-gray-600/70 transition-all duration-300 text-gray-300 hover:text-gray-100 text-sm font-mono tracking-wide">
                                                    SETTINGS
                                                </Link>
                                                <hr className="my-2 border-cyan-800/40" />
                                                <button 
                                                    className="w-full text-left px-4 py-2 rounded-sm bg-transparent hover:bg-red-900/30 border border-red-700/40 hover:border-red-500 transition-all duration-300 text-red-400 hover:text-red-200 text-sm font-mono tracking-wide"
                                                    onClick={() => {
                                                        localStorage.removeItem('token');
                                                        setIsLoggedIn(false);
                                                    }}
                                                >
                                                    LOGOUT
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </>
                        ) : (
                            <>
                                <Link 
                                    href="/signin" 
                                    className="px-4 py-1.5 rounded-sm bg-transparent hover:bg-gray-800/80 border border-gray-700/40 
                                    hover:border-cyan-700 transition-all duration-300 text-gray-400 hover:text-cyan-200 
                                    text-sm font-mono tracking-wide mr-2"
                                >
                                    SIGN IN
                                </Link>
                                <Link 
                                    href="/signup" 
                                    className="px-6 py-2 rounded-sm bg-cyan-900/40 border-2 border-cyan-500/70 hover:border-cyan-300 
                                    transition-all duration-300 text-cyan-200 hover:text-cyan-50 text-sm font-mono tracking-wide
                                    shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] font-bold"
                                >
                                    ENTER THE GRID
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

// Helper component for consistent nav links
interface NavLinkProps {
    href: string;
    label: string;
    className?: string;
}

const NavLink = ({ href, label, className = "" }: NavLinkProps) => (
    <Link 
        href={href} 
        className={`px-4 py-1.5 rounded-sm bg-transparent hover:bg-gray-800/80 border border-gray-700/40 hover:border-cyan-700 
        transition-all duration-300 text-gray-300 hover:text-cyan-200 text-sm font-mono tracking-wide ${className}`}
    >
        {label}
    </Link>
);

export default Header;