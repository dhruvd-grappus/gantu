import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { useState } from "react";
import { SearchBar, TripCard } from "../components";
import { SAMPLE_TRIPS } from "../constants/sampleData";

export default function Index() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pt-5 pb-3">
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            onSearch={handleSearch}
          />
        </View>
        
        <View className="px-4 pb-5">
          <Text className="text-base font-medium text-black mb-4">Filling Fast</Text>
          <TripCard 
            trip={SAMPLE_TRIPS[0]}
            onPress={() => console.log("Card pressed:", SAMPLE_TRIPS[0].title)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
