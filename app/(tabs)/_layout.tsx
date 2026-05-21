import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,

        tabBarStyle: {
          backgroundColor: '#1F2937',
          height: 90,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          borderTopWidth: 0,
        },

        tabBarActiveTintColor: '#064e3b',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? 'home'
                  : 'home-outline'
              }
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',

          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="person"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="feedback"
        options={{
          title: 'Feedback',

          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbox-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}