import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useGetPackageByIdQuery } from '../../store/packagesApi';

export default function PackageDetailScreen() {
  const params = useLocalSearchParams<{ id: string[] }>();
  const id = params.id?.[0] || '';
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState('');

  const { data: packageData, isLoading, error } = useGetPackageByIdQuery(id);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setCurrentUrl(window.location.origin + window.location.pathname);
    } else {
      setCurrentUrl(`gantu://package/${id}`);
    }
  }, [id]);

  const handleShare = async () => {
    const shareUrl = Platform.OS === 'web'
      ? currentUrl
      : `https://gantu.app/package/${id}`;

    if (Platform.OS === 'web') {
      if (navigator.share) {
        try {
          await navigator.share({
            title: packageData?.title,
            text: `Check out this amazing travel package!`,
            url: shareUrl,
          });
        } catch (err) {
          console.log('Error sharing:', err);
        }
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    } else {
      Linking.openURL(`mailto:?subject=${packageData?.title}&body=Check out this amazing travel package!%0A%0A${shareUrl}`);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4A7BA7" />
          <Text className="mt-4 text-gray-600">Loading package details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !packageData) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500">Package not found</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image
            source={{ uri: packageData.image }}
            className="w-full h-64"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 bg-white/90 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            className="absolute top-4 right-4 bg-white/90 rounded-full p-2"
          >
            <Ionicons name="share-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="p-4">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <Text className="text-2xl font-bold mb-2">{packageData.title}</Text>
              <View className="flex-row items-center gap-2">
                <View className="bg-[#F3F6F8] rounded-[9px] pl-2 pr-3 py-1.5 flex-row items-center gap-1.5">
                  <Ionicons name="star" size={18} color="gold" />
                  <Text className="font-semibold text-sm">{packageData.rating.toFixed(1)}</Text>
                </View>
                <View className="bg-[#BBF1B3] rounded-[9px] px-3 py-1.5">
                  <Text className="text-sm font-medium">{packageData.idealFor}</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-6">
            {packageData.tags.map((tag, index) => (
              <View key={index} className="bg-[#F3F6F8] rounded-[9px] px-3 py-2">
                <Text className="text-sm font-medium capitalize">{tag}</Text>
              </View>
            ))}
          </View>

          <View className="bg-gray-50 p-4 rounded-lg mb-6">
            <Text className="text-lg font-semibold mb-3">What's Included</Text>
            {packageData.features.map((feature, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle" size={20} color="#2F8C34" />
                <Text className="ml-2 text-gray-700">{feature}</Text>
              </View>
            ))}
          </View>

          <View className="border-t border-gray-200 pt-4 mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-500 line-through">
                ₹{packageData.originalPrice.toLocaleString('en-IN')}
              </Text>
              <View className="bg-[#2F8C34] rounded px-2 py-1">
                <Text className="text-white text-sm font-semibold">
                  {packageData.discount}% OFF
                </Text>
              </View>
            </View>
            <View className="flex-row items-baseline">
              <Text className="text-3xl font-bold">
                ₹{packageData.discountedPrice.toLocaleString('en-IN')}
              </Text>
              <Text className="text-gray-500 ml-2">/ person</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-blue-500 py-4 rounded-lg items-center mb-4">
            <Text className="text-white font-semibold text-lg">Book Now</Text>
          </TouchableOpacity>

          <View className="bg-gray-100 p-3 rounded-lg">
            <Text className="text-xs text-gray-600">Current URL/Deep Link:</Text>
            <Text className="text-xs text-gray-700 mt-1">{currentUrl}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}