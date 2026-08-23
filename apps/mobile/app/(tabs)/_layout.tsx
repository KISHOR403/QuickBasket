import React from 'react';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0E7C4A',
        tabBarInactiveTintColor: '#14231B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#EEF1EC',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'QuickBasket - 10 Min Grocery',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'My Cart',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
        }}
      />
    </Tabs>
  );
}
