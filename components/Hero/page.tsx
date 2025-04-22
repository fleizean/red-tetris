"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // next/router yerine next/navigation kullanın
import TextScramble from '../TextScramble/page';
import { useState } from 'react';

const Hero = () => {
    const router = useRouter();
    const [scrambleKey, setScrambleKey] = useState(0);

    const handleDiscoverMore = () => {
        // Smooth scroll to the next section
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    };

    const triggerScramble = () => {
        // Her hover'da yeni bir key vererek bileşenin yeniden render edilmesini sağlıyoruz
        setScrambleKey(prev => prev + 1);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/Hero/hero-bg.jpg"
                    alt="Tetris Background"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className="opacity-90 transition-opacity duration-500 ease-in-out transform hover:scale-105"
                />
                {/* Image bileşeninden SONRA karartma katmanı gelmelidir */}
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-white px-4">
                <div
                    className="text-8xl font-bold tracking-tight relative overflow-hidden"
                    onMouseEnter={triggerScramble}
                >
                    <h1 className="font-mono tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-8">
                        <TextScramble
                            key={scrambleKey}
                            text="TETRIX"
                            className="font-mono tracking-tighter"
                        />
                    </h1>
                </div>

                <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center">
                    Challenge yourself with the ultimate multiplayer Tetris experience.
                    Stack, clear, and compete in real-time!
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => router.push('/signin')}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                        Enter the Grid
                    </button>

                    <button
                        onClick={handleDiscoverMore}
                        className="px-8 py-3 bg-transparent border-2 border-white rounded-md font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
                    >
                        Discover More
                    </button>
                </div>
            </div>

            {/* Down arrow for scrolling hint */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white opacity-70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    );
};

export default Hero;