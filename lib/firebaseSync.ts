import { db, storage } from './firebase';
import {
  ref,
  set,
  push,
  onValue,
  serverTimestamp,
  type DatabaseReference,
} from 'firebase/database';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

// --- Realtime Database writes ---

export function registerPlayer(name: string) {
  return set(ref(db, `nick30/players/${name}`), {
    name,
    lastSeen: serverTimestamp(),
  });
}

export function updateLastSeen(name: string) {
  return set(ref(db, `nick30/players/${name}/lastSeen`), serverTimestamp());
}

export function writeScore(playerName: string, score: number) {
  return set(ref(db, `nick30/trivia/scores/${playerName}`), score);
}

export function writeChallenge(playerName: string, challengeId: string) {
  // Read current completers and append this player
  const challengeRef = ref(db, `nick30/challenges/completedBy/${challengeId}`);
  return new Promise<void>((resolve) => {
    onValue(
      challengeRef,
      (snapshot) => {
        const current: string[] = snapshot.val() || [];
        if (!current.includes(playerName)) {
          set(challengeRef, [...current, playerName]).then(resolve);
        } else {
          resolve();
        }
      },
      { onlyOnce: true }
    );
  });
}

export async function uploadPhoto(
  localUri: string,
  playerName: string
): Promise<string> {
  // Fetch the local file as a blob
  const response = await fetch(localUri);
  const blob = await response.blob();

  const filename = `photos/${Date.now()}_${playerName}.jpg`;
  const fileRef = storageRef(storage, filename);

  await uploadBytes(fileRef, blob);
  const downloadUrl = await getDownloadURL(fileRef);

  // Write photo record to Realtime DB
  const photosRef = ref(db, 'nick30/memories/photos');
  await push(photosRef, {
    uri: downloadUrl,
    addedBy: playerName,
    timestamp: Date.now(),
  });

  return downloadUrl;
}

export function writeEasterEgg(eggId: string, playerName: string) {
  return set(ref(db, `nick30/easterEggs/${eggId}`), {
    unlocked: true,
    unlockedBy: playerName,
  });
}

// --- Realtime Database listeners ---

export interface FirebaseState {
  triviaScores: Record<string, number>;
  challengesCompletedBy: Record<string, string[]>;
  memoryPhotos: Array<{ uri: string; addedBy: string; timestamp: number }>;
  unlockedEasterEggs: string[];
}

export function subscribeToState(
  onUpdate: (state: FirebaseState) => void
): () => void {
  const rootRef = ref(db, 'nick30');

  const unsubscribe = onValue(rootRef, (snapshot) => {
    const data = snapshot.val() || {};

    const triviaScores: Record<string, number> = data.trivia?.scores || {};

    const challengesCompletedBy: Record<string, string[]> =
      data.challenges?.completedBy || {};

    const photosObj = data.memories?.photos || {};
    const memoryPhotos = Object.values(photosObj) as Array<{
      uri: string;
      addedBy: string;
      timestamp: number;
    }>;
    // Sort newest first
    memoryPhotos.sort((a, b) => b.timestamp - a.timestamp);

    const eggsObj = data.easterEggs || {};
    const unlockedEasterEggs = Object.entries(eggsObj)
      .filter(([, val]: [string, any]) => val?.unlocked)
      .map(([key]) => key);

    onUpdate({
      triviaScores,
      challengesCompletedBy,
      memoryPhotos,
      unlockedEasterEggs,
    });
  });

  return unsubscribe;
}
