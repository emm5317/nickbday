import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  // Player
  currentPlayer: string | null;
  setCurrentPlayer: (name: string) => void;

  // Trivia
  triviaScores: Record<string, number>;
  triviaCompleted: boolean;
  recordTriviaScore: (player: string, score: number) => void;
  setTriviaCompleted: (completed: boolean) => void;

  // Challenges
  completedChallenges: string[];
  challengePhotos: Record<string, string>;
  completeChallenge: (id: string, photoUri?: string) => void;

  // Memories
  memoryPhotoUris: string[];
  addMemoryPhoto: (uri: string) => void;

  // Easter Eggs
  unlockedEasterEggs: string[];
  unlockEasterEgg: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentPlayer: null,
      setCurrentPlayer: (name) => set({ currentPlayer: name }),

      triviaScores: {},
      triviaCompleted: false,
      recordTriviaScore: (player, score) =>
        set((s) => ({
          triviaScores: { ...s.triviaScores, [player]: score },
          triviaCompleted: true,
        })),
      setTriviaCompleted: (completed) => set({ triviaCompleted: completed }),

      completedChallenges: ['c12'], // Center free space pre-marked
      challengePhotos: {},
      completeChallenge: (id, photoUri) =>
        set((s) => ({
          completedChallenges: s.completedChallenges.includes(id)
            ? s.completedChallenges
            : [...s.completedChallenges, id],
          challengePhotos: photoUri
            ? { ...s.challengePhotos, [id]: photoUri }
            : s.challengePhotos,
        })),

      memoryPhotoUris: [],
      addMemoryPhoto: (uri) =>
        set((s) => ({ memoryPhotoUris: [uri, ...s.memoryPhotoUris] })),

      unlockedEasterEggs: [],
      unlockEasterEgg: (id) =>
        set((s) => ({
          unlockedEasterEggs: s.unlockedEasterEggs.includes(id)
            ? s.unlockedEasterEggs
            : [...s.unlockedEasterEggs, id],
        })),
    }),
    {
      name: 'nick30-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
