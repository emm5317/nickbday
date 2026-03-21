import { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2026-04-16T12:00:00-07:00').getTime();
const WEEKEND_END = new Date('2026-04-20T00:00:00-07:00').getTime();

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
  isWeekendOver: boolean;
}

export function useCountdown(): CountdownResult {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = TARGET_DATE - now;
  const isOver = diff <= 0;
  const isWeekendOver = now >= WEEKEND_END;

  if (isOver) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver, isWeekendOver };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isOver, isWeekendOver };
}
