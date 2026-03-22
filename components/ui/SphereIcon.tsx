import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SphereIconProps {
  size?: number;
}

/**
 * The Sphere — rendered as a gradient globe with specular highlight,
 * grid lines, atmospheric rim, and outer glow rings.
 *
 * Sizes: 36 (inline), 52 (tab bar), 80 (detail)
 */
export function SphereIcon({ size = 52 }: SphereIconProps) {
  const borderWidth = size <= 36 ? 1.5 : size <= 52 ? 2 : 2.5;
  const glowSpread = size <= 36 ? 10 : size <= 52 ? 14 : 20;
  const ringInset = size <= 36 ? -6 : size <= 52 ? -8 : -10;
  const ring2Inset = size <= 36 ? -12 : size <= 52 ? -16 : -20;
  const highlightSize = size * 0.42;
  const highlightTop = size * 0.08;
  const highlightLeft = size * 0.14;
  const gridLineCount = size <= 36 ? 4 : 6;
  const gridOpacity = size <= 36 ? 0.08 : 0.1;

  return (
    <View style={[styles.container, { width: size + 40, height: size + 40 }]}>
      {/* Outer ring 2 — faint purple */}
      <View
        style={[
          styles.ring,
          {
            position: 'absolute',
            top: 20 + ring2Inset,
            left: 20 + ring2Inset,
            right: 20 + ring2Inset,
            bottom: 20 + ring2Inset,
            borderRadius: (size - ring2Inset * 2) / 2,
            borderColor: 'rgba(136,85,224,0.1)',
          },
        ]}
      />

      {/* Outer ring 1 — faint gold */}
      <View
        style={[
          styles.ring,
          {
            position: 'absolute',
            top: 20 + ringInset,
            left: 20 + ringInset,
            right: 20 + ringInset,
            bottom: 20 + ringInset,
            borderRadius: (size - ringInset * 2) / 2,
            borderColor: 'rgba(201,168,76,0.18)',
          },
        ]}
      />

      {/* Main globe */}
      <View
        style={[
          styles.globe,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth,
            borderColor: 'rgba(201,168,76,0.55)',
            // Shadow for outer glow — purple dominant
            shadowColor: '#8855E0',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.55,
            shadowRadius: glowSpread,
            elevation: 12,
          },
        ]}
      >
        {/* Base gradient: purple → amber → gold → dark */}
        <LinearGradient
          colors={['#B87FFF', '#8855E0', '#E8853A', '#C9A84C', '#1a1050']}
          locations={[0, 0.18, 0.52, 0.72, 1.0]}
          start={{ x: 0.32, y: 0.28 }}
          end={{ x: 0.8, y: 0.85 }}
          style={[styles.gradientFill, { borderRadius: size / 2 }]}
        />

        {/* Specular highlight — bright white ellipse top-left */}
        <View
          style={[
            styles.highlight,
            {
              top: highlightTop,
              left: highlightLeft,
              width: highlightSize,
              height: highlightSize * 0.85,
              borderRadius: highlightSize / 2,
            },
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,255,255,0.55)',
              'rgba(255,255,255,0.2)',
              'rgba(255,255,255,0)',
            ]}
            locations={[0, 0.35, 0.7]}
            start={{ x: 0.4, y: 0.35 }}
            end={{ x: 0.8, y: 0.9 }}
            style={[
              styles.gradientFill,
              {
                borderRadius: highlightSize / 2,
                transform: [{ rotate: '-18deg' }],
              },
            ]}
          />
        </View>

        {/* Secondary warm glow — bottom right */}
        <View
          style={[
            styles.secondaryGlow,
            {
              bottom: size * 0.12,
              right: size * 0.1,
              width: size * 0.3,
              height: size * 0.22,
              borderRadius: size * 0.15,
            },
          ]}
        />

        {/* Grid lines — horizontal */}
        <View
          style={[
            styles.gridContainer,
            { borderRadius: size / 2, opacity: gridOpacity },
          ]}
        >
          {Array.from({ length: gridLineCount - 1 }).map((_, i) => (
            <View
              key={`h${i}`}
              style={[
                styles.gridLineH,
                {
                  top: ((i + 1) / gridLineCount) * size,
                },
              ]}
            />
          ))}
          {Array.from({ length: gridLineCount - 1 }).map((_, i) => (
            <View
              key={`v${i}`}
              style={[
                styles.gridLineV,
                {
                  left: ((i + 1) / gridLineCount) * size,
                },
              ]}
            />
          ))}
        </View>

        {/* Atmosphere rim — inset glow effect */}
        <View
          style={[
            styles.atmosphereRim,
            {
              borderRadius: size / 2,
              // Approximate inset shadow with border
              borderWidth: size * 0.06,
              borderColor: 'rgba(136,85,224,0.12)',
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  globe: {
    overflow: 'hidden',
    position: 'relative',
  },
  gradientFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  highlight: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 2,
  },
  secondaryGlow: {
    position: 'absolute',
    backgroundColor: 'rgba(255,200,100,0.18)',
    zIndex: 1,
  },
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 3,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 0.5,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  atmosphereRim: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    zIndex: 4,
  },
  ring: {
    borderWidth: 1,
  },
});
