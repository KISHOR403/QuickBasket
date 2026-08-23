import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { formatCurrency } from '@quickbasket/utils';

export default function MobileCartScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#FCFCFA', padding: 16, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 40, marginBottom: 12 }}>🛒</Text>
      <Text style={{ fontSize: 18, fontWeight: '900', color: '#14231B' }}>Your Cart is Ready</Text>
      <Text style={{ fontSize: 12, color: '#6B9A7A', marginTop: 4, textAlign: 'center' }}>
        Add essentials from dark stores and local kirana to get 10-minute delivery.
      </Text>
      <TouchableOpacity
        onPress={() => router.push('/checkout')}
        style={{
          backgroundColor: '#FF9E2C',
          paddingHorizontal: 24,
          paddingVertical: 14,
          borderRadius: 24,
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#14231B', fontWeight: '900', fontSize: 14 }}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
