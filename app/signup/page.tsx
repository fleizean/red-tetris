'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignUp = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        gdprConsent: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (!formData.gdprConsent) {
            setError('You must accept the Privacy Policy and Terms of Service');
            setLoading(false);
            return;
        }

        try {
            // Here you would implement your actual signup logic
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('User registered:', formData);
            router.push('/login');
        } catch (err) {
            setError('Failed to create account. Please try again.');
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
                        CREATE ACCOUNT
                    </h1>
                    <p className="text-gray-300 mt-2">Join the Tetrix gaming community</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-gray-900/80 rounded-lg shadow-xl w-auto border border-cyan-500/20">
                    {error && (
                        <div className="bg-red-500/70 text-white p-3 rounded-md text-sm animate-pulse border border-red-400">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="fullName" className="block text-cyan-300 mb-2 font-medium tracking-wide text-xs uppercase">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-cyan-300 mb-2 font-medium tracking-wide text-xs uppercase">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                            placeholder="Choose a username"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-cyan-300 mb-2 font-medium tracking-wide text-xs uppercase">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="password" className="block text-cyan-300 mb-2 font-medium tracking-wide text-xs uppercase">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                                placeholder="Create a password"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-cyan-300 mb-2 font-medium tracking-wide text-xs uppercase">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>

                    <div className="mt-6 relative">
                        <div className="flex items-start gap-3 p-4 bg-gray-800/70 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all backdrop-blur-sm">
                            <div className="flex items-center h-5">
                                <input
                                    id="gdprConsent"
                                    name="gdprConsent"
                                    type="checkbox"
                                    checked={formData.gdprConsent}
                                    onChange={handleChange}
                                    className="w-5 h-5 border border-cyan-500 rounded bg-gray-800 focus:ring-3 focus:ring-cyan-600 accent-cyan-500 cursor-pointer"
                                    required
                                />
                            </div>
                            <div className="text-sm">
                                <label htmlFor="gdprConsent" className="text-gray-300 cursor-pointer flex flex-wrap items-center gap-1">
                                    <span>I agree to the</span>
                                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors relative group">
                                        Privacy Policy
                                        <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                                    </a>
                                    <span>and</span>
                                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors relative group">
                                        Terms of Service
                                        <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                                    </a>
                                </label>
                                <span className="text-xs text-gray-400 block mt-1 opacity-70 group-hover:text-cyan-300 transition-colors">
                                    <span className="text-cyan-500/70">▶</span> Required to create your account
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg transition-all hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 flex justify-center items-center shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden group"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 group-hover:opacity-50 opacity-0 transition-opacity"></span>
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <span className="tracking-wider">INITIALIZE ACCOUNT</span>
                        )}
                    </button>
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Account already exists?{' '}
                            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                                Access system
                            </Link>
                        </p>
                    </div>
                </form>


            </div>
        </div>
    );
};

export default SignUp;