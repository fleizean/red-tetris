'use client';

import React, { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
}

const TextScramble: React.FC<TextScrambleProps> = ({
    text,
    className = '',
    speed = 50,
    delay = 0
}) => {
    const [displayText, setDisplayText] = useState('');
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const iterations = useRef(0);
    const frameRequest = useRef<number | null>(null);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            iterations.current = 0;
            scramble();
        }, delay);
        
        return () => {
            clearTimeout(timer);
            if (frameRequest.current !== null) {
                cancelAnimationFrame(frameRequest.current);
            }
        };
    }, [text, delay]);
    
    const scramble = () => {
        const targetText = text;
        let output = '';
        let complete = 0;
        
        for (let i = 0; i < targetText.length; i++) {
            if (i < iterations.current) {
                complete++;
                output += targetText[i];
            } else {
                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                output += randomChar;
            }
        }
        
        setDisplayText(output);
        
        if (complete < targetText.length) {
            iterations.current += 0.5;
            frameRequest.current = requestAnimationFrame(scramble);
        }
    };
    
    return <span className={className}>{displayText}</span>;
};

export default TextScramble;