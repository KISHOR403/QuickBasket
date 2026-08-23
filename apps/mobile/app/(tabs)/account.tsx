import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function MobileAccountScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#FCFCFA', padding: 16 }}>
      <View style={{ backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#EEF1EC', marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '900', color: '#14231B' }}>Vikram Kumar</Text>
        <Text style={{ fontSize: 12, color: '#6B9A7A', marginTop: 2 }}>+91 98765 43210</Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/orders')}
        style={{ backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#EEF1EC', marginBottom: 12 }}
      >
        <Text style={{ fontSize: 14, fontWeight: '800', color: '#0E7C4A' }}>My Orders & Tracking →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/(auth)/login')}
        style={{ backgroundColor: '#F8E8F0', padding: 16, borderRadius: 16, marginTop: 20 }}
      >
        <Text style={{ fontSize: 14, fontWeight: '800', color: '#8A2D5B', textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
