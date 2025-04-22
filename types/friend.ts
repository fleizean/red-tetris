export interface Friend {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    status: 'online' | 'offline' | 'in-game';
    lastGame?: string;
    rank: {
        tier: string;
        icon: string;
    };
}