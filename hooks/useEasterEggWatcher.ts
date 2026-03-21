import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { EASTER_EGGS } from '@/constants/easterEggs';

export function useEasterEggWatcher() {
  const router = useRouter();
  const unlockedEasterEggs = useAppStore((s) => s.unlockedEasterEggs);
  const unlockEasterEgg = useAppStore((s) => s.unlockEasterEgg);

  useEffect(() => {
    const check = () => {
      const now = Date.now();
      for (const egg of EASTER_EGGS) {
        if (unlockedEasterEggs.includes(egg.id)) continue;
        const triggerTime = new Date(egg.triggerISO).getTime();
        // Fire on first app open after trigger time (no upper bound)
        if (now >= triggerTime) {
          unlockEasterEgg(egg.id);
          router.push({
            pathname: '/easter-egg',
            params: { eggId: egg.id },
          });
          break;
        }
      }
    };

    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, [unlockedEasterEggs, unlockEasterEgg, router]);
}
