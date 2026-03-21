# Nick's 30 in Vegas 🎰

A hyper-personal iOS companion app for Nick's 30th birthday weekend in Las Vegas (April 16–19, 2026). Built for 5 people, distributed via TestFlight.

## Features

### Home Dashboard
- Live countdown to the weekend with animated pulse
- Nick's photo in a gold dashed avatar ring
- 2x2 module grid with card suit icons (♦♠♣♥)
- Starfield background and marquee bulb dot strip
- Hidden tortoise easter egg at 12% opacity
- "Find the Crew" card with live player status

### Weekend Schedule (♦)
- Day-by-day event timeline (THU/FRI/SAT/SUN tabs)
- Colored timeline dots matching event tags (featured, VIP, confirmed, private)
- Swipe between days
- Event detail bottom sheets
- Phish at the Sphere — Saturday 8:30 PM

### Nick Trivia (♠)
- 30-question trivia game about the birthday boy
- A/B/C/D answer buttons with correct/wrong color feedback
- Progress bar + live score chip
- Haptic feedback on answers, confetti on game completion
- Firebase-synced leaderboard across all devices

### Bingo Challenges (♣)
- 5x5 bingo grid with 25 Vegas weekend challenges
- Tap to view details and mark complete
- Bingo line detection (rows, columns, diagonals)
- Confetti explosion + haptic buzz on bingo line completion
- Free center space pre-completed
- Per-player completion tracking synced via Firebase

### Memories (♥)
- In-app photo vault — capture or import photos
- Automatic "NICK'S 30 · LAS VEGAS · APR 2026" watermark
- 3-column photo grid with full-screen viewer
- Swipe down to dismiss photo viewer
- Share button via iOS share sheet
- Photos uploaded to Firebase Storage, visible on all devices

### Find the Crew
- Real-time location sharing across all 5 devices
- Full-screen map centered on the Vegas Strip
- Color-coded pins per player with "last seen" timestamps
- Foreground GPS polling every 30 seconds via Firebase

### Easter Eggs
- Time-based midnight reveals (Friday + Saturday nights)
- Fires on next app open after trigger time
- Full-screen animated modal with content reel

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 54 (managed workflow) |
| Language | TypeScript (strict mode) |
| Navigation | Expo Router (file-based, 5 tabs) |
| State | Zustand + Firebase Realtime Database |
| Photos | Firebase Storage + expo-image-picker |
| Location | expo-location + Firebase Realtime DB |
| Maps | react-native-maps |
| Fonts | Playfair Display + DM Sans (Google Fonts) |
| Animations | React Native Animated API |
| Haptics | expo-haptics |
| Confetti | react-native-confetti-cannon |
| Build | EAS Build → TestFlight |

## Design System

Vegas poster-inspired dark theme with warm accents:

- **Vegas Gold** `#C9A84C` — primary accent
- **Marquee Amber** `#E8853A` — warm secondary
- **Desert Rust** `#C04A2A` — tertiary accent
- **Electric Cyan** `#00D4C8` — success/confirmed states
- **Neon Pink** `#FF3D78` — active/error states
- **Velvet Purple** `#9664F0` — private events
- **Deep Navy** `#06060F` — background

Card suits as navigation icons:
- ♦ Diamond → Schedule
- ♠ Spade → Trivia / Home
- ♣ Club → Bingo
- ♥ Heart → Memories

## Getting Started

### Prerequisites
- Node.js 20+ (tested with Node 24)
- Expo Go on an iPhone
- Firebase project with Realtime Database + Storage enabled

### Setup

```bash
# Clone
git clone https://github.com/emm5317/nickbday.git
cd nickbday

# Install dependencies
npm install

# Create .env from template
cp .env.example .env
# Fill in your Firebase config values in .env

# Start dev server (Node 24 requires the env var)
# PowerShell:
$env:NODE_OPTIONS="--no-experimental-strip-types"; npx expo start

# Or bash:
NODE_OPTIONS="--no-experimental-strip-types" npx expo start
```

Scan the QR code with your iPhone camera to open in Expo Go.

### Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Realtime Database** (test mode)
3. Enable **Storage** (test mode)
4. Create a web app and copy the config to `.env`

### Build for TestFlight

```bash
eas build --platform ios --profile production
eas submit --platform ios --latest
```

## Project Structure

```
app/                    # Expo Router screens
  (tabs)/               # 5-tab navigation
    index.tsx           # Home Dashboard
    schedule.tsx        # Weekend Schedule
    trivia/             # Trivia game flow
    challenges.tsx      # Bingo grid
    memories.tsx        # Photo vault
  crew-map.tsx          # Location sharing map
  easter-egg.tsx        # Midnight reveal modal
  player-select.tsx     # First-launch name picker

components/             # UI components by feature
constants/              # Theme tokens, player list, easter egg config
data/                   # Static content (schedule, trivia, challenges)
hooks/                  # Custom hooks (countdown, location, watermark)
store/                  # Zustand + Firebase hybrid state
lib/                    # Firebase initialization + sync layer
```

## Players

Nick · Yulyia · Eric · Kayla · Lyndsey

---

Built with Expo + TypeScript + Firebase for a weekend that won't be forgotten.
