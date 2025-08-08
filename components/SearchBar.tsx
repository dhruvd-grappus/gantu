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
    <View className="flex-row md:max-w-[80%] items-center bg-white border border-gray-200 rounded-[20px] px-6 py-5 mx-4">
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-3 text-base text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
    </View>
  );
}