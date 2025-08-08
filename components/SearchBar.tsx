import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: () => void;
}

export default function SearchBar({
  placeholder = "Search destinations, activities...",
  value,
  onChangeText,
  onSearch
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-white border border-[#D6DDDF] rounded-[20px] w-[76vw] md:w-[80%] px-6 h-[61px] gap-[31px] mx-4">
      <View className="flex-row items-center gap-[14px]">
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 flex-grow flex-shrink-0 font-inter text-base text-gray-900 md:w-[50vw] border-none focus:border-none focus:ring-0 focus:outline-none"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          onSubmitEditing={onSearch}

        />
      </View>
    </View>
  );
}