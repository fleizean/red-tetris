'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setMessage('Invalid or missing password reset token');
        }
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        if (passwords.password !== passwords.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        if (passwords.password.length < 8) {
            setMessage('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);

        try {
            // Here you would implement your actual password reset logic
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSuccess(true);
            setMessage('Your password has been successfully reset');
            console.log('Password reset for token:', token);
            
            // Redirect to login after successful password reset
            setTimeout(() => {
                router.push('/signin');
            }, 3000);
        } catch (err) {
            setMessage('Error resetting password. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                        RESET PASSWORD
                    </h1>
                    <p className="text-gray-300 mt-2">Enter your new password below</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-gray-900/80 rounded-lg shadow-xl w-full border border-cyan-500/20">
                    {message && (
                        <div className={`${isSuccess ? 'bg-green-500/70 border-green-400' : 'bg-red-500/70 border-red-400'} text-white p-3 rounded-md text-sm animate-pulse border`}>
                            {message}
                        </div>
                    )}

                    {!token ? (
                        <div className="text-center py-4">
                            <p className="text-red-400 mb-4">Invalid or expired reset link</p>
                            <Link href="/forgot-password" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                                Request a new password reset
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div>
                                <label htmlFor="password" className="block text-cyan-300 mb-2 font-medium tracking-wide text-xs uppercase">New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={passwords.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                                    placeholder="Enter your new password"
                                    minLength={8}
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-cyan-300 mb-2 font-medium tracking-wide text-xs uppercase">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwords.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                                    placeholder="Confirm your new password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || isSuccess}
                                className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg transition-all hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 flex justify-center items-center shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 group-hover:opacity-50 opacity-0 transition-opacity"></span>
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <span className="tracking-wider">RESET PASSWORD</span>
                                )}
                            </button>
                        </>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Back to{' '}
                            <Link href="/signin" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 text-gray-400 text-xs mx-auto text-center max-w-xs">
                        <p>For security, your password must be at least 8 characters long and include a mix of letters, numbers, and symbols.</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;