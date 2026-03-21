import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

function SuitIcon({ suit, color }: { suit: string; color: string }) {
  return (
    <Text style={{ fontFamily: Fonts.body, fontSize: 24, color }}>
      {suit}
    </Text>
  );
}

function HomeIcon({ color }: { color: string }) {
  return (
    <View style={[styles.homeCircle, { borderColor: color }]}>
      <Text style={[styles.homeIcon, { color }]}>{'\u2660'}</Text>
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
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
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
  homeCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2.5,
    backgroundColor: Colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -14,
  },
  homeIcon: {
    fontFamily: Fonts.body,
    fontSize: 22,
  },
});
