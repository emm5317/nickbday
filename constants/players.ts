export const PLAYERS = ['Nick', 'Yulyia', 'Eric', 'Kayla', 'Lyndsey'] as const;

export type PlayerName = (typeof PLAYERS)[number];
