import { useState } from 'react';
import Link from 'next/link';
import TextScramble from '../TextScramble/page';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [scrambleKey, setScrambleKey] = useState(0);

    const triggerScramble = () => {
        setScrambleKey(prev => prev + 1);
    };

    return (
        <footer className="bg-gray-900/95 backdrop-blur-sm text-white py-8 border-t border-cyan-600/20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <Link href="/" className="group">
                            <div 
                                className="text-2xl font-bold tracking-tight mb-4 relative overflow-hidden"
                                onMouseEnter={triggerScramble}
                            >
                                <TextScramble 
                                    key={scrambleKey}
                                    text="TETRIX" 
                                    className="font-mono tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent"
                                />
                            </div>
                        </Link>
                        <p className="text-gray-300 leading-relaxed">
                            TetriX is a thrilling online Tetris game that challenges your skills and reflexes.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold mb-5 text-cyan-400 font-mono tracking-wide">NAVIGATION</h3>
                        <nav className="flex flex-col space-y-3">
                            <FooterLink href="/play" label="PLAY" />
                            <FooterLink href="/leaderboard" label="RANKINGS" />
                            <FooterLink href="/login" label="LOGIN" />
                            <FooterLink href="/register" label="SIGN UP" />
                            <FooterLink href="/about" label="ABOUT" />
                            <FooterLink href="/profile" label="PROFILE" />
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-5 text-cyan-400 font-mono tracking-wide">CONTACT</h3>
                        <nav className="flex flex-col space-y-3">
                            <FooterLink href="/contact" label="CONTACT" />
                            <FooterLink href="/privacy-policy" label="PRIVACY POLICY" />
                            <FooterLink href="/terms-of-service" label="TERMS OF SERVICE" />
                        </nav>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 font-mono text-sm">
                        &copy; {currentYear} TetriX. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

// Helper component for consistent footer links
interface FooterLinkProps {
    href: string;
    label: string;
}

const FooterLink = ({ href, label }: FooterLinkProps) => (
    <Link 
        href={href} 
        className="text-gray-300 hover:text-cyan-300 transition-all duration-300 flex items-center font-mono text-sm"
    >
        <span className="transform hover:translate-x-2 transition-transform duration-300">
            {label}
        </span>
    </Link>
);

export default Footer;