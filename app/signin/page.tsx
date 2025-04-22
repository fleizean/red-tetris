'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignIn = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

        try {
            // Here you would implement your actual signin logic
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('User logged in:', formData);
            router.push('/dashboard');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
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
                        SYSTEM ACCESS
                    </h1>
                    <p className="text-gray-300 mt-2">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-gray-900/80 rounded-lg shadow-xl w-full border border-cyan-500/20">
                    {error && (
                        <div className="bg-red-500/70 text-white p-3 rounded-md text-sm animate-pulse border border-red-400">
                            {error}
                        </div>
                    )}

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

                    <div>
                        <label htmlFor="password" className="block text-cyan-300 mb-2 font-medium tracking-wide text-xs uppercase">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                                placeholder="Enter your password"
                            />
                            <button 
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-cyan-400 hover:text-cyan-300"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {formData.password ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">                 
                        <div className="text-sm">
                            <Link href="/forgot-password" 
                                  className="text-cyan-400 hover:text-cyan-300 transition-colors relative inline-block px-2 py-1 overflow-hidden group">
                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-cyan-500/10 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                <span className="relative">Do you have access issues?</span>
                            </Link>
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
                            <span className="tracking-wider">ACCESS SYSTEM</span>
                        )}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                                Create one now
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 text-gray-400 text-xs mx-auto text-center max-w-xs">
                        <p>By accessing the Tetrix system, you agree to our security protocols and data handling procedures.</p>
                    </div>
                </form>

               
            </div>
        </div>
    );
};

export default SignIn;