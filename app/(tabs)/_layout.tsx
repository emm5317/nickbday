import { Tabs } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

function SuitIcon({ suit, color }: { suit: string; color: string }) {
  return (
    <Text style={{ fontFamily: Fonts.body, fontSize: 24, color }}>
      {suit}
    </Text>
  );
}

function HomeIcon() {
  return (
    <View style={styles.homeWrap}>
      <Image
        source={require('@/assets/images/sphere-home.png')}
        style={styles.homeImage}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bgDeep,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: {
          fontFamily: Fonts.body,
          fontSize: 10,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => <SuitIcon suit={'\u2666'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trivia"
        options={{
          title: 'Trivia',
          tabBarIcon: ({ color }) => <SuitIcon suit={'\u2660'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Bingo',
          tabBarIcon: ({ color }) => <SuitIcon suit={'\u2663'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="memories"
        options={{
          title: 'Memories',
          tabBarIcon: ({ color }) => <SuitIcon suit={'\u2665'} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  homeWrap: {
    marginTop: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});
