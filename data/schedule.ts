import { TagColors } from '@/constants/theme';

export type EventTag = 'featured' | 'confirmed' | 'vip' | 'private' | 'optional';

export interface ScheduleEvent {
  id: string;
  day: 'THU' | 'FRI' | 'SAT' | 'SUN';
  time: string;
  timeISO: string;
  name: string;
  venue: string;
  notes?: string;
  tag: EventTag;
  tagLabel: string;
  tagColor: keyof typeof TagColors;
  isBirthdayEvent?: boolean;
  details?: Array<{ icon: string; text: string }>;
  timeSection?: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'CHECKOUT & DEPARTURE';
  isAnchorEvent?: boolean;
  isNextUp?: boolean;
}

export const DAYS = ['THU', 'FRI', 'SAT', 'SUN'] as const;
export type Day = (typeof DAYS)[number];

export const DAY_DATES: Record<Day, number> = {
  THU: 16,
  FRI: 17,
  SAT: 18,
  SUN: 19,
};

export const DAY_VIBES: Record<Day, { icon: string; temp: string; condition: string; vibe: string }> = {
  THU: { icon: '\u{2600}\u{FE0F}', temp: '82\u00B0F', condition: 'Sunny', vibe: 'Easy arrival \u2014 just get here' },
  FRI: { icon: '\u{1F382}', temp: '78\u00B0F', condition: 'Clear', vibe: 'THE birthday \u2014 go all out' },
  SAT: { icon: '\u{1F525}', temp: '85\u00B0F', condition: 'Perfect pool day', vibe: 'Full send \u2014 no half measures' },
  SUN: { icon: '\u{1F305}', temp: '80\u00B0F', condition: 'Sunny', vibe: 'Legends depart quietly' },
};

export const SCHEDULE: ScheduleEvent[] = [
  // --- THURSDAY Apr 16 (Arrival) ---
  {
    id: 'thu-1',
    day: 'THU',
    time: '2 PM',
    timeISO: '2026-04-16T14:00:00-07:00',
    name: 'Fly into Las Vegas',
    venue: 'Harry Reid International \u00B7 Terminal 1',
    tag: 'optional',
    tagLabel: 'ARRIVAL',
    tagColor: 'amber',
    timeSection: 'AFTERNOON',
    details: [
      { icon: '\u{1F4CD}', text: 'Terminal 1 \u2014 rideshare pickup at Level 1 exits. ~25 min to the Strip.' },
    ],
  },
  {
    id: 'thu-2',
    day: 'THU',
    time: '4 PM',
    timeISO: '2026-04-16T16:00:00-07:00',
    name: 'Hotel Check-In',
    venue: '[Hotel TBD] \u00B7 The Strip',
    notes: 'Drop bags, get changed \u2014 the Strip awaits',
    tag: 'confirmed',
    tagLabel: 'CHECK-IN',
    tagColor: 'gold',
    isBirthdayEvent: true,
    timeSection: 'AFTERNOON',
    details: [
      { icon: '\u{1F3E8}', text: 'Check-in from 4 PM. Request high floor \u2014 Strip views are worth it.' },
    ],
  },
  {
    id: 'thu-3',
    day: 'THU',
    time: '8 PM',
    timeISO: '2026-04-16T20:00:00-07:00',
    name: 'First Night Out',
    venue: '[Venue TBD] \u00B7 The Strip',
    notes: 'Easy one \u2014 explore, grab drinks, warm up',
    tag: 'optional',
    tagLabel: 'NIGHTLIFE',
    tagColor: 'pink',
    timeSection: 'EVENING',
    details: [
      { icon: '\u{1F3AF}', text: 'Good spot for early Bingo challenge attempts. Bellagio fountains are a 5-min walk.' },
    ],
  },

  // --- FRIDAY Apr 17 (Birthday Day) ---
  {
    id: 'fri-1',
    day: 'FRI',
    time: '11 AM',
    timeISO: '2026-04-17T11:00:00-07:00',
    name: 'Birthday Brunch',
    venue: '[Restaurant TBD]',
    tag: 'confirmed',
    tagLabel: 'GROUP MEAL',
    tagColor: 'gold',
    timeSection: 'MORNING',
    details: [
      { icon: '\u{1F942}', text: 'Mimosas mandatory. This is the calm before the storm.' },
    ],
  },
  {
    id: 'fri-2',
    day: 'FRI',
    time: '2 PM',
    timeISO: '2026-04-17T14:00:00-07:00',
    name: 'Pool + Day Party',
    venue: '[Pool Venue TBD] \u00B7 The Strip',
    tag: 'featured',
    tagLabel: 'MAIN EVENT',
    tagColor: 'cyan',
    isBirthdayEvent: true,
    timeSection: 'AFTERNOON',
    details: [
      { icon: '\u{1F4F8}', text: 'Great for Bingo: Pool Time, Champagne Toast, Group Selfie.' },
    ],
  },
  {
    id: 'fri-3',
    day: 'FRI',
    time: '7 PM',
    timeISO: '2026-04-17T19:00:00-07:00',
    name: 'Phamily at The Sphere',
    venue: 'Las Vegas Sphere \u00B7 Doors 6:30 PM',
    tag: 'featured',
    tagLabel: 'THE SPHERE',
    tagColor: 'amber',
    isBirthdayEvent: true,
    isAnchorEvent: true,
    timeSection: 'EVENING',
    details: [
      { icon: '\u{1F4CD}', text: 'The Sphere at The Venetian. Arrive by 6:30 PM. No large bags.' },
      { icon: '\u{26A1}', text: 'Largest LED screen on earth. Sensory experience unlike anything.' },
      { icon: '\u{1F457}', text: 'Smart casual. Dress for Nick\'s birthday \u2014 this is the moment.' },
    ],
  },
  {
    id: 'fri-4',
    day: 'FRI',
    time: '10 PM',
    timeISO: '2026-04-17T22:00:00-07:00',
    name: 'Birthday Night Out',
    venue: '[Club / Bar TBD] \u00B7 The Strip',
    tag: 'vip',
    tagLabel: 'VIP TABLE',
    tagColor: 'pink',
    timeSection: 'EVENING',
    details: [
      { icon: '\u{1F0CF}', text: 'Post-Sphere energy will be high. Confirm table reservation by 9:30 PM.' },
    ],
  },
  {
    id: 'fri-5',
    day: 'FRI',
    time: '12 AM',
    timeISO: '2026-04-18T00:00:00-07:00',
    name: '\u{1F389} Midnight \u2014 Something Unlocks',
    venue: 'Open the app to find out',
    tag: 'private',
    tagLabel: 'EASTER EGG \u{1F512}',
    tagColor: 'purple',
    timeSection: 'EVENING',
    details: [
      { icon: '\u{1F513}', text: 'A surprise fires at midnight. Make sure everyone has the app open.' },
    ],
  },

  // --- SATURDAY Apr 18 ---
  {
    id: 'sat-1',
    day: 'SAT',
    time: '12 PM',
    timeISO: '2026-04-18T12:00:00-07:00',
    name: 'Encore Beach Club',
    venue: 'Encore at Wynn \u00B7 Pool Deck',
    notes: 'Daybed reserved \u00B7 Bottle service 2 PM',
    tag: 'featured',
    tagLabel: 'DAYBED RESERVED',
    tagColor: 'gold',
    isBirthdayEvent: true,
    isNextUp: true,
    timeSection: 'AFTERNOON',
    details: [
      { icon: '\u{1F3CA}', text: 'Daybed confirmed. Arrive by noon. Bring sunscreen and cash for tips.' },
      { icon: '\u{1F4F8}', text: 'Bingo: Pool Time, Dance Floor, Group Selfie.' },
    ],
  },
  {
    id: 'sat-2',
    day: 'SAT',
    time: '5 PM',
    timeISO: '2026-04-18T17:00:00-07:00',
    name: 'Casino Floor',
    venue: 'Wynn \u00B7 Main Casino',
    notes: 'Between pool and dinner \u2014 Bingo window',
    tag: 'optional',
    tagLabel: 'OPTIONAL',
    tagColor: 'amber',
    timeSection: 'AFTERNOON',
    details: [
      { icon: '\u{1F3B0}', text: 'Craps, blackjack, slots \u2014 all Bingo targets. Set a budget before you sit down.' },
    ],
  },
  {
    id: 'sat-3',
    day: 'SAT',
    time: '7 PM',
    timeISO: '2026-04-18T19:00:00-07:00',
    name: 'Dinner \u2014 Nobu',
    venue: 'Caesars Palace \u00B7 Reservation @ 7 PM',
    notes: 'Under Eric \u00B7 Smart casual required',
    tag: 'confirmed',
    tagLabel: 'RESERVATION \u2713',
    tagColor: 'cyan',
    isBirthdayEvent: true,
    timeSection: 'EVENING',
    details: [
      { icon: '\u{1F4CB}', text: 'Under Eric. Arrive 10 min early. Let them know it\'s a birthday weekend.' },
      { icon: '\u{1F363}', text: 'Order the black cod miso. Trust the process.' },
    ],
  },
  {
    id: 'sat-4',
    day: 'SAT',
    time: '10 PM',
    timeISO: '2026-04-18T22:00:00-07:00',
    name: 'Club XS',
    venue: 'Encore \u00B7 Table 14 \u00B7 Confirm by 9:30 PM',
    tag: 'vip',
    tagLabel: 'VIP TABLE',
    tagColor: 'pink',
    timeSection: 'EVENING',
    details: [
      { icon: '\u{1F3AB}', text: 'Table 14. Text the host at 9:30 PM. Dress code strictly enforced.' },
      { icon: '\u{1F483}', text: 'Bingo: Nick Worm, Dance Floor \u2014 this is the night.' },
    ],
  },
  {
    id: 'sat-5',
    day: 'SAT',
    time: '2 AM',
    timeISO: '2026-04-19T02:00:00-07:00',
    name: 'After Party \u00B7 Suite',
    venue: 'Suite 3201 \u00B7 Wynn Tower',
    tag: 'private',
    tagLabel: 'PRIVATE',
    tagColor: 'purple',
    timeSection: 'EVENING',
    details: [
      { icon: '\u{1F510}', text: 'Room key required. Keep it tight. Easter egg fires at midnight \u2014 app open.' },
    ],
  },

  // --- SUNDAY Apr 19 (Departure) ---
  {
    id: 'sun-1',
    day: 'SUN',
    time: '10 AM',
    timeISO: '2026-04-19T10:00:00-07:00',
    name: 'Recovery Brunch',
    venue: '[Restaurant TBD] \u00B7 Near Hotel',
    notes: 'Mimosas mandatory. Stories required.',
    tag: 'confirmed',
    tagLabel: 'GROUP MEAL',
    tagColor: 'gold',
    isBirthdayEvent: true,
    timeSection: 'MORNING',
    details: [
      { icon: '\u{2615}', text: 'Everyone recaps their night. Trivia leaderboard review. Final Bingo pushes.' },
    ],
  },
  {
    id: 'sun-2',
    day: 'SUN',
    time: '12 PM',
    timeISO: '2026-04-19T12:00:00-07:00',
    name: 'Hotel Checkout',
    venue: '[Hotel TBD] \u00B7 Checkout by Noon',
    notes: 'Bags to bell desk \u2014 one last casino lap',
    tag: 'optional',
    tagLabel: 'CHECKOUT',
    tagColor: 'amber',
    timeSection: 'CHECKOUT & DEPARTURE',
    details: [
      { icon: '\u{1F9F3}', text: 'Bell desk holds bags. Free your hands for the final stretch.' },
    ],
  },
  {
    id: 'sun-3',
    day: 'SUN',
    time: 'TBD',
    timeISO: '2026-04-19T15:00:00-07:00',
    name: 'Depart Las Vegas',
    venue: 'Harry Reid International \u00B7 Terminal 1',
    notes: 'Nick turns 30 once. This was it. \u{1F422}',
    tag: 'optional',
    tagLabel: 'DEPARTURE',
    tagColor: 'rust',
    timeSection: 'CHECKOUT & DEPARTURE',
    details: [
      { icon: '\u{2708}\u{FE0F}', text: 'Allow 90 min before flight. Sunday afternoon flights fill fast \u2014 rideshare early.' },
    ],
  },
];
