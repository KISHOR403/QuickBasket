import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useCategoriesQuery, useProductsQuery, useVendorsQuery } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';

export default function MobileHomeScreen() {
  const router = useRouter();
  const { data: categories } = useCategoriesQuery();
  const { data: products } = useProductsQuery();
  const { data: vendors } = useVendorsQuery();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FCFCFA' }} contentContainerStyle={{ padding: 16 }}>
      {/* Hero Banner */}
      <View style={{ backgroundColor: '#0E7C4A', padding: 20, borderRadius: 16, marginBottom: 20 }}>
        <Text style={{ color: '#FF9E2C', fontWeight: '900', fontSize: 12, textTransform: 'uppercase' }}>
          ⚡ 10 MIN EXPRESS DELIVERY
        </Text>
        <Text style={{ color: '#FFFFFF', fontWeight: '900', fontSize: 22, marginTop: 4 }}>
          Groceries & Local Kirana Favorites
        </Text>
        <Text style={{ color: '#E7F5EE', fontSize: 12, marginTop: 4 }}>
          Delivering fresh milk, vegetables & snacks to your doorstep
        </Text>
      </View>

      {/* Categories */}
      <Text style={{ fontWeight: '900', fontSize: 16, color: '#14231B', marginBottom: 12 }}>
        Shop by Category
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
        {categories?.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => router.push(`/category/${cat.slug}`)}
            style={{
              alignItems: 'center',
              marginRight: 16,
              width: 70,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                backgroundColor: cat.accentColor || '#EEF1EC',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <Text style={{ fontSize: 24 }}>🛒</Text>
            </View>
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#14231B', textAlign: 'center' }}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Multi-Vendor Stores */}
      <Text style={{ fontWeight: '900', fontSize: 16, color: '#14231B', marginBottom: 12 }}>
        Local Partner Kirana Stores
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
        {vendors?.map((v) => (
          <View
            key={v.id}
            style={{
              width: 200,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 12,
              marginRight: 12,
              borderWidth: 1,
              borderColor: '#EEF1EC',
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: '900', color: '#0E7C4A', textTransform: 'uppercase' }}>
              ★ {v.rating} • {v.deliveryTimeMin} MINS
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '800', color: '#14231B', marginTop: 4 }}>
              {v.name}
            </Text>
            <Text style={{ fontSize: 11, color: '#6B9A7A', marginTop: 2 }}>{v.address}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <Text style={{ fontWeight: '900', fontSize: 16, color: '#14231B', marginBottom: 12 }}>
        Trending Bestsellers
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {products?.map((prod) => (
          <TouchableOpacity
            key={prod.id}
            onPress={() => router.push(`/product/${prod.slug}`)}
            style={{
              width: '48%',
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 12,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#EEF1EC',
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: '900', color: '#8A2D5B' }}>{prod.brand}</Text>
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#14231B', marginTop: 2, height: 32 }}>
              {prod.name}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '900', color: '#0E7C4A' }}>
                {formatCurrency(prod.variants[0]?.price || 0)}
              </Text>
              <View style={{ backgroundColor: '#0E7C4A', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '900' }}>ADD</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
