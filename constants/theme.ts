export const Colors = {
  // Backgrounds
  bgDeep: '#06060F',
  bgCard: '#0E0E1C',
  bgElevated: '#161628',

  // Brand
  gold: '#C9A84C',
  goldLight: '#E2C97E',
  goldDark: '#8A6F2E',

  // Neons
  neonPink: '#FF3D78',
  neonCyan: '#00D4C8',
  velvetPurple: '#9664F0',

  // Text
  textPrimary: '#F0EAD6',
  textSecondary: '#9490A8',
  textMuted: 'rgba(148, 144, 168, 0.5)',

  // Borders
  border: 'rgba(201, 168, 76, 0.18)',
  borderAccent: 'rgba(201, 168, 76, 0.35)',
} as const;

export const Fonts = {
  display: 'PlayfairDisplay_700Bold',
  displayBlack: 'PlayfairDisplay_900Black',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemiBold: 'DMSans_600SemiBold',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const TagColors = {
  gold: { bg: 'rgba(201,168,76,0.2)', text: '#E2C97E' },
  pink: { bg: 'rgba(255,61,120,0.2)', text: '#FF7DAA' },
  cyan: { bg: 'rgba(0,212,200,0.2)', text: '#4DE8E2' },
  purple: { bg: 'rgba(150,100,240,0.2)', text: '#C4A8FF' },
} as const;
