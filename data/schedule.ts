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
}

export const DAYS = ['THU', 'FRI', 'SAT', 'SUN'] as const;
export type Day = (typeof DAYS)[number];

export const SCHEDULE: ScheduleEvent[] = [
  // --- THURSDAY Apr 16 (Arrival) ---
  {
    id: 'thu-1',
    day: 'THU',
    time: 'TBD',
    timeISO: '2026-04-16T15:00:00-07:00',
    name: 'Arrive in Las Vegas',
    venue: 'Harry Reid International Airport',
    tag: 'optional',
    tagLabel: 'ARRIVAL',
    tagColor: 'gold',
  },
  {
    id: 'thu-2',
    day: 'THU',
    time: 'TBD',
    timeISO: '2026-04-16T16:00:00-07:00',
    name: 'Hotel Check-in',
    venue: 'TBD',
    tag: 'confirmed',
    tagLabel: 'CHECK-IN',
    tagColor: 'cyan',
  },
  {
    id: 'thu-3',
    day: 'THU',
    time: 'TBD',
    timeISO: '2026-04-16T20:00:00-07:00',
    name: 'First Night Out',
    venue: 'TBD',
    tag: 'optional',
    tagLabel: 'OPTIONAL',
    tagColor: 'gold',
  },

  // --- FRIDAY Apr 17 (Birthday Day) ---
  {
    id: 'fri-1',
    day: 'FRI',
    time: 'TBD',
    timeISO: '2026-04-17T12:00:00-07:00',
    name: 'Birthday Day Activity',
    venue: 'TBD',
    tag: 'featured',
    tagLabel: 'BIRTHDAY BOY',
    tagColor: 'gold',
    isBirthdayEvent: true,
  },
  {
    id: 'fri-2',
    day: 'FRI',
    time: 'TBD',
    timeISO: '2026-04-17T18:00:00-07:00',
    name: 'Birthday Dinner',
    venue: 'TBD',
    tag: 'confirmed',
    tagLabel: 'RESERVATION',
    tagColor: 'cyan',
  },
  {
    id: 'fri-3',
    day: 'FRI',
    time: 'TBD',
    timeISO: '2026-04-17T22:00:00-07:00',
    name: 'Night Out',
    venue: 'TBD',
    tag: 'vip',
    tagLabel: 'VIP TABLE',
    tagColor: 'pink',
  },

  // --- SATURDAY Apr 18 ---
  {
    id: 'sat-1',
    day: 'SAT',
    time: 'TBD',
    timeISO: '2026-04-18T12:00:00-07:00',
    name: 'Pool / Day Activity',
    venue: 'TBD',
    tag: 'optional',
    tagLabel: 'GROUP ACTIVITY',
    tagColor: 'gold',
  },
  {
    id: 'sat-2',
    day: 'SAT',
    time: '8:30 PM',
    timeISO: '2026-04-18T20:30:00-07:00',
    name: 'Phish at the Sphere',
    venue: 'The Sphere',
    notes: '8:30 PM - Midnight. The big one.',
    tag: 'featured',
    tagLabel: 'FEATURED',
    tagColor: 'gold',
    isBirthdayEvent: true,
  },
  {
    id: 'sat-3',
    day: 'SAT',
    time: 'TBD',
    timeISO: '2026-04-19T00:30:00-07:00',
    name: 'After Party',
    venue: 'TBD',
    tag: 'private',
    tagLabel: 'PRIVATE',
    tagColor: 'purple',
  },

  // --- SUNDAY Apr 19 (Departure) ---
  {
    id: 'sun-1',
    day: 'SUN',
    time: 'TBD',
    timeISO: '2026-04-19T10:00:00-07:00',
    name: 'Brunch',
    venue: 'TBD',
    tag: 'optional',
    tagLabel: 'OPTIONAL',
    tagColor: 'gold',
  },
  {
    id: 'sun-2',
    day: 'SUN',
    time: 'TBD',
    timeISO: '2026-04-19T12:00:00-07:00',
    name: 'Hotel Checkout',
    venue: 'TBD',
    tag: 'optional',
    tagLabel: 'CHECKOUT',
    tagColor: 'gold',
  },
  {
    id: 'sun-3',
    day: 'SUN',
    time: 'TBD',
    timeISO: '2026-04-19T15:00:00-07:00',
    name: 'Depart Las Vegas',
    venue: 'Harry Reid International Airport',
    tag: 'optional',
    tagLabel: 'DEPARTURE',
    tagColor: 'gold',
  },
];
