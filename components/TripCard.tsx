import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Trip} from '../types';

interface TripCardProps {
  trip: Trip;
  onPress?: () => void;
}

const TripCard = memo(function TripCard({ trip, onPress }: TripCardProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      className="bg-white rounded-[20px] px-[5px] pt-[5px] pb-5 w-[280px] min-h-[400px] shadow-lg"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
      }}
      activeOpacity={0.9}
    >
      <View className="gap-3">
        <View className="gap-[34px]">
          <View className="gap-3">
            <Image
              source={{ uri: trip.image }}
              className="w-[270px] h-[142px] rounded-[20px]"
              resizeMode="cover"
            />

            <View className="px-2.5 gap-[11px]">
              <View className="flex-row flex-wrap gap-1">
                {trip.tags.map((tag, index) => (
                  <View key={index} className="bg-[#F3F6F8] rounded-[9px] px-2.5 py-2 h-[30px] justify-center">
                    <Text className="font-inter-display text-xs font-medium text-black capitalize">{tag}</Text>
                  </View>
                ))}

                <View className="bg-[#BBF1B3] rounded-[9px] pl-2 pr-2.5 py-2 h-[30px] flex-row items-center gap-1">
                  <Ionicons name="people" size={16} color="white" />
                  <Text className="font-inter-display text-xs font-medium text-black capitalize">{trip.idealFor}</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center gap-[13px]">
                <View className="gap-2">
                  <Text
                    className="font-inter-display text-base font-medium text-black w-[169px]"
                    numberOfLines={2}
                    style={{ letterSpacing: -0.32 }}
                  >
                    {trip.title}
                  </Text>

                  <View className="flex-row gap-1.5">
                    {[1, 2, 3, 4, 5].map((pin) => (
                      <Ionicons
                        key={pin}
                        name="location"
                        size={12}
                        color="#9CA3AF"
                      />
                    ))}
                  </View>
                </View>

                <View className="bg-[#F3F6F8] rounded-[9px] pl-2 pr-3 py-1.5 flex-row items-center gap-1.5">
                  <Ionicons name="star" size={18} color="gold" />
                  <Text
                    className="font-inter-display text-xs font-semibold text-black uppercase"
                    style={{ letterSpacing: 1 }}
                  >
                    {trip.rating.toFixed(1)}
                  </Text>
                </View>
              </View>

              <View className="bg-[#F3F6F8] rounded-[9px] p-2 flex-row flex-wrap gap-2 w-[260px]">
                {trip.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center gap-1">
                    <View className="w-3 h-[9px] bg-white rounded-[6px]" />
                    <Text className="font-inter-display text-xs font-light text-[#7744DD]">{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-end px-2.5 gap-5">
          <View className="gap-[11px]">
            <View className="flex-row items-center gap-[5px]">
              <Text className="font-inter-tight text-xs text-black/50 line-through">
                ₹{trip.originalPrice.toLocaleString('en-IN')}/-
              </Text>
              <View className="bg-[#2F8C34] rounded-[4px] px-1 py-1">
                <Text className="font-inter-tight text-xs text-white uppercase">
                  {trip.discount}% off
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-0.5">
              <Text className="font-inter-display text-base font-semibold text-black">
                ₹{trip.discountedPrice.toLocaleString('en-IN')}
              </Text>
              <Text className="font-inter-tight text-xs text-black/50">/ person</Text>
            </View>
          </View>

          <TouchableOpacity className="flex-row items-center gap-[7px]">
            <Text className="font-inter-tight text-sm font-semibold text-black">View Details</Text>
            <View style={{ width: 5.19, height: 10.38 }}>
              <Ionicons name="chevron-forward" size={10} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default TripCard;