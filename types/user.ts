export interface User {
    username: string;
    displayName: string;
    avatar: string;
    bio: string;
    rank: {
        tier: string;
        points: number;
        icon: string;
    };
    stats: {
        wins: number;
        losses: number;
        draws: number;
        winRate: number;
    };
    status: 'online' | 'offline' | 'in-game';
    isFriend: boolean;
    isBlocked: boolean;
    isCurrentUser: boolean;
    currentSong?: {        
        spotifyId: string; // Changed from audio to spotifyId
    }
}