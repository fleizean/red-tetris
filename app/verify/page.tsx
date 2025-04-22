'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const verifyEmailToken = async () => {
            if (!token) {
                setVerificationStatus('error');
                setMessage('Invalid or missing verification token');
                return;
            }

            try {
                // Simulate API call - replace with your actual verification API
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // For demo purposes; replace with actual verification logic
                if (token.length > 5) {
                    setVerificationStatus('success');
                    setMessage('Your email has been successfully verified!');
                } else {
                    setVerificationStatus('error');
                    setMessage('Invalid or expired verification token');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setVerificationStatus('error');
                setMessage('Something went wrong during verification. Please try again.');
            }
        };

        verifyEmailToken();
    }, [token]);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Futuristic background elements */}
            <Image
                src="/images/SignInUp/signinup-bg.png"
                alt="Futuristic Background"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-5"></div>

            <div className="w-full max-w-md flex flex-col items-center z-10">
                {/* Title */}
                <div className="text-center mb-8 mt-7">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                        EMAIL VERIFICATION
                    </h1>
                    <p className="text-gray-300 mt-2">Verifying your account</p>
                </div>

                <div className="p-8 space-y-5 bg-gray-900/80 rounded-lg shadow-xl w-full border border-cyan-500/20">
                    <div className={`text-center py-6 flex flex-col items-center justify-center ${
                        verificationStatus === 'loading' ? 'text-cyan-300' : 
                        verificationStatus === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}>
                        {verificationStatus === 'loading' && (
                            <div className="mb-5">
                                <svg className="animate-spin h-12 w-12 text-cyan-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}

                        {verificationStatus === 'success' && (
                            <div className="mb-5 text-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        )}
                        
                        {verificationStatus === 'error' && (
                            <div className="mb-5 text-red-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        )}
                        
                        <p className="text-lg font-medium">{message}</p>
                        
                        {verificationStatus !== 'loading' && (
                            <div className="mt-6">
                                {verificationStatus === 'success' ? (
                                    <Link 
                                        href="/signin" 
                                        className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg transition-all hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    >
                                        SIGN IN
                                    </Link>
                                ) : (
                                    <Link 
                                        href="/" 
                                        className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg transition-all hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    >
                                        GO TO HOME
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-8 text-gray-400 text-xs mx-auto text-center max-w-xs">
                        {verificationStatus === 'error' && !token && (
                            <p>If you're having trouble verifying your email, please request a new verification link from your profile settings.</p>
                        )}
                        {verificationStatus === 'success' && (
                            <p>Your account is now fully verified. You can now enjoy all features of our platform.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;