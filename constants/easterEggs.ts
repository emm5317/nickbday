export interface EasterEgg {
  id: string;
  triggerISO: string;
  title: string;
  subtitle: string;
  content: 'birthday-reel' | 'embarrassing-reel';
}

export const EASTER_EGGS: EasterEgg[] = [
  {
    id: 'midnight-friday',
    triggerISO: '2026-04-17T00:00:00-07:00',
    title: 'Happy Birthday, Nick!',
    subtitle: "It's officially the big day.",
    content: 'birthday-reel',
  },
  {
    id: 'midnight-saturday',
    triggerISO: '2026-04-18T00:00:00-07:00',
    title: "Nick's Greatest Hits",
    subtitle: "You asked for it. He didn't.",
    content: 'embarrassing-reel',
  },
];

export const THIRTY_THINGS_ABOUT_NICK = [
  { number: 1, text: '[Something you love about Nick]' },
  { number: 2, text: '[A funny habit]' },
  { number: 3, text: '[A childhood story]' },
  // TODO: Fill in all 30 entries
];

export const EMBARRASSING_MOMENTS = [
  { title: '[Moment name]', story: '[Short story]', hasPhoto: false },
  // TODO: Fill in embarrassing moments
];
