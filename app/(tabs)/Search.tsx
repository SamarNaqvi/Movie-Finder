import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import { useFetch } from "../hooks/useFetch";
import { fetchMovies } from "../services/api";
import { icons } from "@/constants/icons";
import MovieCard from "../components/MovieCard";
import { updateAppwriteSearchCount } from "../services/appWrite";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
        if(movies && movies?.[0])
          await updateAppwriteSearchCount(searchQuery, movies?.[0]);
      } else {
        reset();
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          minHeight: 100,
        }}
      >
        <Image source={icons.logo} className="mx-auto h-12 w-12 mt-20 mb-5" />
        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-20 self-center"
          />
        ) : error ? (
          <Text className="text-red-700">{error?.message}</Text>
        ) : (
          <>
            <SearchBar
              onPress={() => router.push("/Search")}
              placeHolderText="Enter Movie Name to Search"
              onChange={(text) => {
                setSearchQuery(text);
              }}
              value={searchQuery}
            />
            <Text className="text-white my-2 text-lg">Latest Movies</Text>
            <FlatList
              data={movies}
              scrollEnabled={false}
              renderItem={({ item }) => <MovieCard {...item} />}
              numColumns={3}
              columnWrapperClassName="gap-5"
              keyExtractor={(item) => item?.id.toString()}
              ListEmptyComponent={() =>
                !loading && !error && <Text className="text-white mt-20 text-center">No Movies Found</Text>
              }
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
