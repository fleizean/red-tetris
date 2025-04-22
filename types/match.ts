export interface Match {
    id: string;
    date: string;
    opponent: string;
    opponentAvatar: string;
    userScore: number;
    opponentScore: number;
    result: 'win' | 'loss' | 'draw';
    gameStats: {
        duration: string;
        linesCleared: number;
        tetrisCount: number;
    };
}