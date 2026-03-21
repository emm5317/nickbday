# Nick's 30 — Las Vegas Birthday App

## Overview
iOS companion app for Nick's 30th birthday weekend in Las Vegas (Apr 16-19, 2026).
Distributed to 5 people via TestFlight. No backend — all data is local on-device.

## Tech Stack
- **Framework:** Expo SDK 55 (managed workflow)
- **Language:** TypeScript (strict mode)
- **Navigation:** Expo Router (file-based routing with tabs)
- **State:** Zustand with `persist` middleware + AsyncStorage
- **Fonts:** Playfair Display (display), DM Sans (body) via @expo-google-fonts
- **Build:** EAS Build (cloud iOS compilation) → EAS Submit → TestFlight

## Commands
- `npx expo start` — Start dev server (scan QR with Expo Go on iPhone)
- `npx expo start --clear` — Start with cache cleared
- `eas build --platform ios --profile preview` — Build for internal testing
- `eas build --platform ios --profile production` — Production build
- `eas submit --platform ios --latest` — Submit to TestFlight
- `npx tsc --noEmit` — Type-check without building

## Architecture

### Routing (app/)
File-based routing via Expo Router. 4 tabs: Home, Schedule, Trivia, Memories.
Challenges screen pushed from Home tile (not a tab). Easter egg is a modal overlay.

### Design System (constants/theme.ts)
Single source of truth for all colors, fonts, spacing, radii, and tag colors.
**Never hardcode visual values in components** — always import from theme.

### Data (data/)
Static TypeScript arrays — schedule events, trivia questions, bingo challenges.
All content editing happens here; no component changes needed to update content.

### State (store/useAppStore.ts)
Zustand store with slices: player, trivia scores, completed challenges,
memory photos, unlocked easter eggs. Persisted to AsyncStorage.

### Components (components/)
Organized by feature: ui/, home/, schedule/, trivia/, challenges/, memories/.
Screens use default exports (Expo Router requirement).
Non-screen components use named exports.

## Key Conventions
- TypeScript strict mode — no `any` types
- Functional components only
- Import paths use `@/` alias (maps to project root)
- Dark theme throughout — background is always Colors.bgDeep (#06060F)
- Gold (#C9A84C) is the primary accent color
- No backend, no auth, no network calls — everything runs offline
- 5 players: Nick, Yulyia, Eric, Kayla, Lyndsey

## Testing
Test on physical iPhone via Expo Go (QR code scan).
No iOS Simulator on Windows — use Expo Go for development,
EAS Dev Build for final pre-launch testing.
