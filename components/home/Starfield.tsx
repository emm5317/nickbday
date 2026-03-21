import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Pre-computed star positions for consistency
const STARS = [
  { x: 0.08, y: 0.05, size: 1.5, opacity: 0.4 },
  { x: 0.92, y: 0.03, size: 1, opacity: 0.3 },
  { x: 0.25, y: 0.12, size: 1.5, opacity: 0.35 },
  { x: 0.78, y: 0.08, size: 2, opacity: 0.25 },
  { x: 0.45, y: 0.18, size: 1, opacity: 0.4 },
  { x: 0.15, y: 0.25, size: 1.5, opacity: 0.3 },
  { x: 0.88, y: 0.22, size: 1, opacity: 0.35 },
  { x: 0.55, y: 0.3, size: 1.5, opacity: 0.25 },
  { x: 0.35, y: 0.38, size: 1, opacity: 0.4 },
  { x: 0.7, y: 0.35, size: 2, opacity: 0.2 },
  { x: 0.1, y: 0.45, size: 1, opacity: 0.3 },
  { x: 0.95, y: 0.42, size: 1.5, opacity: 0.35 },
  { x: 0.5, y: 0.5, size: 1, opacity: 0.25 },
  { x: 0.22, y: 0.55, size: 1.5, opacity: 0.3 },
  { x: 0.82, y: 0.58, size: 1, opacity: 0.4 },
  { x: 0.4, y: 0.65, size: 2, opacity: 0.2 },
  { x: 0.65, y: 0.7, size: 1, opacity: 0.35 },
  { x: 0.12, y: 0.72, size: 1.5, opacity: 0.3 },
  { x: 0.9, y: 0.75, size: 1, opacity: 0.25 },
  { x: 0.3, y: 0.82, size: 1.5, opacity: 0.4 },
  { x: 0.75, y: 0.85, size: 1, opacity: 0.3 },
  { x: 0.05, y: 0.9, size: 2, opacity: 0.2 },
  { x: 0.58, y: 0.92, size: 1, opacity: 0.35 },
];

export function Starfield() {
  return (
    <View style={styles.container} pointerEvents="none">
      {STARS.map((star, i) => (
        <View
          key={i}
          style={[
            styles.star,
            {
              left: star.x * width,
              top: star.y * height,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#F0EAD6',
  },
});
