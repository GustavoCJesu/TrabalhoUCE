import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AppLayout() {
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
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      {/* Aba da Página Principal */}
      <Tabs.Screen
        name="paginaPrincipal" // Refere-se a paginaPrincipal.tsx
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />

      {/* Aba do Perfil (que está dentro da subpasta) */}
      <Tabs.Screen
        name="profile/ProfileScreen" // Refere-se a (profile)/index.tsx
        options={{
          title: 'Perfil',tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,  
        }}
      />
    </Tabs>
  );
}