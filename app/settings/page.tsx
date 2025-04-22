'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaUser, FaLock, FaEye, FaSpotify, FaUserSecret, FaSave, FaUpload } from 'react-icons/fa';

const Settings = () => {
    // State for active tab
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'privacy'>('profile');
    
    // User profile state
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        avatar: '/images/default_pic.webp',
        spotifyTrackId: 'https://open.spotify.com/embed/track/0QdNo0hthGtMENckZTiHe4?utm_source=generator',
    });

    // Security state
    const [security, setSecurity] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Privacy settings state
    const [privacy, setPrivacy] = useState({
        isProfilePrivate: false,
        hideUsername: false,
    });

    // Avatar upload
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Form states
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Handle tab change
    const handleTabChange = (tab: 'profile' | 'security' | 'privacy') => {
        setActiveTab(tab);
        setSuccess('');
        setError('');
    };

    // Handle profile form change
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    // Handle security form change
    const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSecurity(prev => ({ ...prev, [name]: value }));
    };

    // Handle privacy settings change
    const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setPrivacy(prev => ({ ...prev, [name]: checked }));
    };

    // Handle avatar upload
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle profile form submission
    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // If avatar was changed, update it in profile
            if (avatarPreview) {
                setProfile(prev => ({ ...prev, avatar: avatarPreview }));
                setAvatarPreview(null);
            }
            
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle security form submission
    const handleSecuritySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        // Validation
        if (security.newPassword !== security.confirmPassword) {
            setError('New passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess('Password updated successfully!');
            setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError('Failed to update password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle privacy form submission
    const handlePrivacySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess('Privacy settings updated successfully!');
        } catch (err) {
            setError('Failed to update privacy settings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            setLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Account deleted successfully.');
                // Redirect to home or login page would happen here in a real app
            } catch (err) {
                setError('Failed to delete account. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center py-8 px-4 relative">
            {/* Futuristic background elements */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <Image
                    src="/images/SignInUp/signinup-bg.png"
                    alt="Futuristic Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
            </div>

            <div className="w-full max-w-4xl z-10 flex flex-col gap-8">
                <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
                        Account Settings
                    </h1>

                    {/* Tabs navigation */}
                    <div className="flex border-b border-cyan-500/30 mb-8">
                        <button
                            onClick={() => handleTabChange('profile')}
                            className={`px-6 py-3 font-medium flex items-center gap-2 ${
                                activeTab === 'profile'
                                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            <FaUser /> Profile
                        </button>
                        <button
                            onClick={() => handleTabChange('security')}
                            className={`px-6 py-3 font-medium flex items-center gap-2 ${
                                activeTab === 'security'
                                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            <FaLock /> Security
                        </button>
                        <button
                            onClick={() => handleTabChange('privacy')}
                            className={`px-6 py-3 font-medium flex items-center gap-2 ${
                                activeTab === 'privacy'
                                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            <FaUserSecret /> Privacy
                        </button>
                    </div>

                    {/* Status messages */}
                    {success && (
                        <div className="bg-green-500/20 text-green-400 p-4 rounded-lg mb-6 border border-green-500/30">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-6 border border-red-500/30">
                            {error}
                        </div>
                    )}

                    {/* Profile Settings */}
                    {activeTab === 'profile' && (
                        <form onSubmit={handleProfileSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Avatar upload */}
                                <div className="flex flex-col items-center gap-4">
                                    <div
                                        className="relative cursor-pointer group"
                                        onClick={handleAvatarClick}
                                    >
                                        <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-gradient-to-r from-cyan-500 to-purple-500 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/20">
                                            <Image
                                                src={avatarPreview || profile.avatar}
                                                alt="Profile Avatar"
                                                width={160}
                                                height={160}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                            <FaUpload className="text-white text-2xl" />
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleAvatarChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <span className="text-sm text-gray-400">Click to change avatar</span>
                                </div>

                                {/* Profile info fields */}
                                <div className="md:col-span-2 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-cyan-400 mb-2 text-sm">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={profile.firstName}
                                                onChange={handleProfileChange}
                                                className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-cyan-400 mb-2 text-sm">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={profile.lastName}
                                                onChange={handleProfileChange}
                                                className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-cyan-400 mb-2 text-sm">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={profile.username}
                                            onChange={handleProfileChange}
                                            className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-cyan-400 mb-2 text-sm">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleProfileChange}
                                            className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center text-cyan-400 mb-2 text-sm">
                                            <FaSpotify className="mr-2" /> Spotify Track ID
                                        </label>
                                        <input
                                            type="text"
                                            name="spotifyTrackId"
                                            value={profile.spotifyTrackId}
                                            onChange={handleProfileChange}
                                            placeholder="https://open.spotify.com/embed/track/..."
                                            className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                        />
                                        <p className="text-xs text-gray-400 mt-2">
                                            Paste the Spotify embed URL of your favorite track to display on your profile
                                        </p>
                                    </div>

                                    {/* Preview of the current Spotify track */}
                                    {profile.spotifyTrackId && (
                                        <div className="mt-4">
                                            <label className="block text-cyan-400 mb-2 text-sm">Current Track Preview</label>
                                            <div className="bg-gray-800/40 p-3 rounded-xl">
                                                <iframe
                                                    src={profile.spotifyTrackId}
                                                    width="100%"
                                                    height="80"
                                                    frameBorder="0"
                                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                                    loading="lazy"
                                                    className="rounded-xl"
                                                ></iframe>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 font-medium disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <FaSave />
                                    )}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <form onSubmit={handleSecuritySubmit} className="space-y-6">
                            <div>
                                <label className="block text-cyan-400 mb-2 text-sm">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={security.currentPassword}
                                    onChange={handleSecurityChange}
                                    className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-cyan-400 mb-2 text-sm">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={security.newPassword}
                                    onChange={handleSecurityChange}
                                    className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-cyan-400 mb-2 text-sm">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={security.confirmPassword}
                                    onChange={handleSecurityChange}
                                    className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                    required
                                />
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 font-medium disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <FaLock />
                                    )}
                                    Update Password
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Privacy Settings */}
                    {activeTab === 'privacy' && (
                        <form onSubmit={handlePrivacySubmit} className="space-y-8">
                            <div className="bg-gray-800/50 p-5 rounded-xl">
                                <h3 className="text-lg text-cyan-400 mb-4">Profile Visibility</h3>
                                
                                <div className="flex items-center justify-between p-3 border-b border-gray-700">
                                    <div>
                                        <h4 className="text-white font-medium">Private Profile</h4>
                                        <p className="text-sm text-gray-400">Only friends can view your profile details</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="isProfilePrivate"
                                            checked={privacy.isProfilePrivate}
                                            onChange={handlePrivacyChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                    </label>
                                </div>
                                
                                <div className="flex items-center justify-between p-3">
                                    <div>
                                        <h4 className="text-white font-medium">Hide Username</h4>
                                        <p className="text-sm text-gray-400">Display only your nickname to other players</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="hideUsername"
                                            checked={privacy.hideUsername}
                                            onChange={handlePrivacyChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-red-900/20 p-5 rounded-xl border border-red-500/30">
                                <h3 className="text-lg text-red-400 mb-4">Danger Zone</h3>
                                <p className="text-gray-300 mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleDeleteAccount}
                                    disabled={loading}
                                    className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 rounded-lg font-medium transition-all disabled:opacity-50"
                                >
                                    Delete Account
                                </button>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 font-medium disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <FaEye />
                                    )}
                                    Save Privacy Settings
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;