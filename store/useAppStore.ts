import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  writeChallenge,
  writeScore,
  writeEasterEgg,
  writeOpenEndedAnswer,
  type FirebaseState,
  type PlayerLocation,
} from '@/lib/firebaseSync';

interface AppState {
  // Player (local only — each device picks their own name)
  currentPlayer: string | null;
  setCurrentPlayer: (name: string) => void;

  // Trivia (synced via Firebase)
  triviaScores: Record<string, number>;
  triviaCompleted: boolean;
  recordTriviaScore: (player: string, score: number) => void;
  setTriviaCompleted: (completed: boolean) => void;

  // Open-ended trivia (synced via Firebase)
  openEndedAnswers: Record<string, Record<string, string>>; // questionId → playerName → answer
  submitOpenEndedAnswer: (questionId: string, answer: string) => void;

  // Challenges (synced via Firebase — per-player completions)
  completedChallenges: string[]; // derived: all challenge IDs completed by anyone
  challengesCompletedBy: Record<string, string[]>; // challengeId → player names
  completeChallenge: (id: string) => void;

  // Memories (synced via Firebase — shared photo URLs)
  memoryPhotoUris: string[];
  memoryPhotos: Array<{ uri: string; addedBy: string; timestamp: number }>;
  addMemoryPhoto: (uri: string) => void;
  setMemoryPhotos: (
    photos: Array<{ uri: string; addedBy: string; timestamp: number }>
  ) => void;

  // Locations (synced via Firebase)
  locations: Record<string, PlayerLocation>;

  // Easter Eggs (synced via Firebase)
  unlockedEasterEggs: string[];
  unlockEasterEgg: (id: string) => void;

  // Firebase sync
  syncFromFirebase: (data: FirebaseState) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentPlayer: null,
      setCurrentPlayer: (name) => set({ currentPlayer: name }),

      triviaScores: {},
      triviaCompleted: false,
      recordTriviaScore: (player, score) => {
        set((s) => ({
          triviaScores: { ...s.triviaScores, [player]: score },
          triviaCompleted: true,
        }));
        writeScore(player, score);
      },
      setTriviaCompleted: (completed) => set({ triviaCompleted: completed }),

      openEndedAnswers: {},
      submitOpenEndedAnswer: (questionId, answer) => {
        const player = get().currentPlayer;
        if (!player) return;
        set((s) => ({
          openEndedAnswers: {
            ...s.openEndedAnswers,
            [questionId]: {
              ...s.openEndedAnswers[questionId],
              [player]: answer,
            },
          },
        }));
        writeOpenEndedAnswer(questionId, player, answer);
      },

      completedChallenges: ['c12'],
      challengesCompletedBy: {},
      completeChallenge: (id) => {
        const player = get().currentPlayer;
        if (!player) return;
        set((s) => ({
          completedChallenges: s.completedChallenges.includes(id)
            ? s.completedChallenges
            : [...s.completedChallenges, id],
          challengesCompletedBy: {
            ...s.challengesCompletedBy,
            [id]: [...(s.challengesCompletedBy[id] || []), player],
          },
        }));
        writeChallenge(player, id);
      },

      memoryPhotoUris: [],
      memoryPhotos: [],
      addMemoryPhoto: (uri) => {
        // Local-only add for immediate UI; Firebase upload handled in component
        set((s) => ({ memoryPhotoUris: [uri, ...s.memoryPhotoUris] }));
      },
      setMemoryPhotos: (photos) => {
        set({
          memoryPhotos: photos,
          memoryPhotoUris: photos.map((p) => p.uri),
        });
      },

      locations: {},

      unlockedEasterEggs: [],
      unlockEasterEgg: (id) => {
        const player = get().currentPlayer;
        set((s) => ({
          unlockedEasterEggs: s.unlockedEasterEggs.includes(id)
            ? s.unlockedEasterEggs
            : [...s.unlockedEasterEggs, id],
        }));
        if (player) writeEasterEgg(id, player);
      },

      syncFromFirebase: (data) => {
        const allCompletedIds = Object.keys(data.challengesCompletedBy);
        // Always include free space
        if (!allCompletedIds.includes('c12')) allCompletedIds.push('c12');

        set({
          triviaScores: data.triviaScores,
          openEndedAnswers: data.openEndedAnswers,
          triviaCompleted: Object.keys(data.triviaScores).length > 0,
          challengesCompletedBy: data.challengesCompletedBy,
          completedChallenges: allCompletedIds,
          memoryPhotos: data.memoryPhotos,
          memoryPhotoUris: data.memoryPhotos.map((p) => p.uri),
          unlockedEasterEggs: data.unlockedEasterEggs,
          locations: data.locations,
        });
      },
    }),
    {
      name: 'nick30-local',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist local-only state
      partialize: (state) => ({
        currentPlayer: state.currentPlayer,
      }),
    }
  )
);
