import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useProductsQuery } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';
import { useRouter } from 'expo-router';

export default function MobileSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { data: products } = useProductsQuery({ search: query });

  return (
    <View style={{ flex: 1, backgroundColor: '#FCFCFA', padding: 16 }}>
      <TextInput
        placeholder="Search milk, tomatoes, lays, paan..."
        value={query}
        onChangeText={setQuery}
        style={{
          backgroundColor: '#EEF1EC',
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 14,
          marginBottom: 16,
        }}
      />

      <ScrollView>
        {products?.map((p) => (
          <TouchableOpacity
            key={p.id}
            onPress={() => router.push(`/product/${p.slug}`)}
            style={{
              padding: 12,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              marginBottom: 8,
              borderWidth: 1,
              borderColor: '#EEF1EC',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#14231B' }}>{p.name}</Text>
              <Text style={{ fontSize: 11, color: '#6B9A7A' }}>{p.vendorName}</Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '900', color: '#0E7C4A' }}>
              {formatCurrency(p.variants[0]?.price || 0)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
