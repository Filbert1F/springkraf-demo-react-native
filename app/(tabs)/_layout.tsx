import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            android: {
              elevation: 2,
            },
          }),
          height: 80,
          paddingTop: 8,
          paddingBottom: 16,
          backgroundColor: '#eee',
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 0.5,
          paddingTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#eee',
        },
        headerTitleStyle: {
          fontFamily: Platform.select({
            ios: 'System',
            android: 'Roboto',
          }),
          fontSize: 22,
          fontWeight: 'normal',
          color: '#1C1B1F',
        },
      }}>
      <Tabs.Screen
        name="notes/index"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons 
              name="newspaper" 
              size={24} 
              color={color}
            />
          ),
          headerTitle: 'My Notes',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="notes-archived/index"
        options={{
          title: 'Archived',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons 
              name="archive" 
              size={24} 
              color={color}
            />
          ),
          headerTitle: 'Archived Notes',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}