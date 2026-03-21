# Nick's 30 in Vegas — Birthday App

## Overview
iOS companion app for Nick's 30th birthday weekend in Las Vegas (Apr 16-19, 2026).
Distributed to 5 people via TestFlight. No backend — all data is local on-device.

## Tech Stack
- **Framework:** Expo SDK 54 (managed workflow)
- **Language:** TypeScript (strict mode)
- **Navigation:** Expo Router (file-based routing with 5 tabs)
- **State:** Zustand with `persist` middleware + AsyncStorage
- **Fonts:** Playfair Display (display), DM Sans (body) via @expo-google-fonts
- **Build:** EAS Build (cloud iOS compilation) → EAS Submit → TestFlight

## Commands
- `$env:NODE_OPTIONS="--no-experimental-strip-types"; npx expo start` — Start dev server (Node 24 requires the env var)
- `npx expo start --clear` — Start with cache cleared
- `eas build --platform ios --profile preview` — Build for internal testing
- `eas build --platform ios --profile production` — Production build
- `eas submit --platform ios --latest` — Submit to TestFlight
- `npx tsc --noEmit` — Type-check without building

## Architecture

### Routing (app/)
File-based routing via Expo Router. 5 tabs: Schedule (♦), Trivia (♠), Home (♠ center), Bingo (♣), Memories (♥).
Easter egg is a modal overlay. Player select is a modal on first launch.

### Design System (constants/theme.ts)
Single source of truth for all colors, fonts, spacing, radii, and tag colors.
**Never hardcode visual values in components** — always import from theme.

Key colors: Vegas Gold (#C9A84C), Marquee Amber (#E8853A), Desert Rust (#C04A2A),
Neon Pink (#FF3D78), Electric Cyan (#00D4C8), Velvet Purple (#9664F0).

Card suits are used as navigation icons throughout:
- ♦ Diamond → Schedule (gold)
- ♠ Spade → Trivia (amber), also Home center button
- ♣ Club → Bingo/Challenges (cyan)
- ♥ Heart → Memories (pink)

### Visual Features
- Starfield background on Home (scattered dot elements)
- Marquee bulb dot strip (alternating gold/amber dots under hero title)
- Hidden tortoise easter egg (🐢 at 12% opacity, bottom corner of Home)
- Nick's photo in dashed gold avatar ring on Home

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
Node 24 requires `NODE_OPTIONS=--no-experimental-strip-types` to start the dev server.
No iOS Simulator on Windows — use Expo Go for development,
EAS Dev Build for final pre-launch testing.
