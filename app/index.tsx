import React, { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import TripCard from "../components/TripCard";
import MapView from "../components/Map/MapView";
import { useGetPackagesByCategoryQuery } from "../store/packagesApi";
import type { Trip } from "../types";

interface Section {
  title: string;
  category: string;
}

export default function Index() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();


  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  // Create sections with different package categories
  const sections: Section[] = [
    {
      title: "Filling Fast",
      category: "adventure"
    },
    {
      title: "Popular Destinations", 
      category: "culture"
    },
    {
      title: "Best Value",
      category: "beach"
    },
    {
      title: "Luxury Packages",
      category: "luxury"
    },
    {
      title: "Adventure Trips",
      category: "mountains"
    },
    {
      title: "Beach Escapes",
      category: "islands"
    }
  ];

  const handlePackagePress = useCallback((packageId: string) => {
    router.push(`/package/${packageId}`);
  }, [router]);

  const SectionComponent = useCallback(({ section }: { section: Section }) => {
    const { data: packages, isLoading, error } = useGetPackagesByCategoryQuery(section.category);

    return (
      <View className="mb-6">
        <View className="px-4 mb-4">
          <Text className="text-lg font-semibold text-black">{section.title}</Text>
        </View>
        
        {isLoading ? (
          <View className="flex-row justify-center items-center h-[400px]">
            <ActivityIndicator size="large" color="#4A7BA7" />
          </View>
        ) : error ? (
          <View className="px-4">
            <Text className="text-red-500">Failed to load packages</Text>
          </View>
        ) : (
          <FlatList
            horizontal
            data={packages || []}
            keyExtractor={(trip) => `${section.title}-${trip.id}`}
            renderItem={({ item: trip }) => (
              <View className="ml-4">
                <TripCard
                  trip={trip}
                  onPress={() => handlePackagePress(trip.id)}
                />
              </View>
            )}
            contentContainerStyle={{ paddingRight: 16 }}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={2}
            maxToRenderPerBatch={3}
            windowSize={5}
            getItemLayout={(data, index) => ({
              length: 280,
              offset: 280 * index,
              index,
            })}
          />
        )}
      </View>
    );
  }, [handlePackagePress]);

  const renderHorizontalList = useCallback(({ item }: { item: Section }) => (
    <SectionComponent section={item} />
  ), [SectionComponent]);

  const ListHeaderComponent = useCallback(() => (
    <>
      <View className="px-4 pt-5 pb-3">
        <MapView height={200} />
      </View>
      
      <View className="pt-3 pb-3">
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSearch={handleSearch}
        />
      </View>
    </>
  ), [searchText, handleSearch]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={renderHorizontalList}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}