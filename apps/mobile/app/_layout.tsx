import React from 'react';
import { Stack } from 'expo-router';
import { ApiQueryProvider } from '@quickbasket/api-client';

export default function RootLayout() {
  return (
    <ApiQueryProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0E7C4A' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="category/[slug]" options={{ title: 'Category Products' }} />
        <Stack.Screen name="product/[slug]" options={{ title: 'Product Details' }} />
        <Stack.Screen name="checkout" options={{ title: 'Checkout & Delivery' }} />
        <Stack.Screen name="orders/index" options={{ title: 'My Orders' }} />
        <Stack.Screen name="orders/[orderId]" options={{ title: 'Live Order Tracking' }} />
        <Stack.Screen name="(auth)/login" options={{ title: 'Login / Register' }} />
      </Stack>
    </ApiQueryProvider>
  );
}
