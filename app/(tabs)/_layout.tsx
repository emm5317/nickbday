import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Colors } from '@/constants/theme';

function TabIcon({ emoji, color }: { emoji: string; color: string }) {
  return <Text style={{ fontSize: 22, color }}>{emoji}</Text>;
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
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon emoji={'\u{1F3E0}'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => <TabIcon emoji={'\u{1F4C5}'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trivia"
        options={{
          title: 'Trivia',
          tabBarIcon: ({ color }) => <TabIcon emoji={'\u{1F3AF}'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="memories"
        options={{
          title: 'Memories',
          tabBarIcon: ({ color }) => <TabIcon emoji={'\u{1F4F8}'} color={color} />,
        }}
      />
    </Tabs>
  );
}
