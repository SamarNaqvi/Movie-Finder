import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import { useFetch } from "../hooks/useFetch";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies } from "../services/appWrite";
import TrendingCard from "../components/TrendingCard";

const Home = () => {
  const router = useRouter();
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }), true);

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(() => getTrendingMovies(), true);

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
        {loading || trendingMoviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-20 self-center"
          />
        ) : error || trendingMoviesError ? (
          <Text className="text-red-700">
            {error?.message ? error?.message : trendingMoviesError?.message}
          </Text>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => router.push("/Search")}
              className="border border-solid border-purple-500 bg-dark-200 px-4 py-[1.14rem] rounded-full flex flex-row gap-6 items-center"
            >
              <Image
                source={icons.search}
                tintColor={"#AB8BFF"}
                resizeMode="contain"
              />
              <Text className="text-purple-300" style={{ color: "#AB8BFF" }}>
                Enter Movie Name to Search
              </Text>
            </TouchableOpacity>
           
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  //@ts-ignore
                  keyExtractor={(item) => item.$id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}
            <Text className="text-white my-2 text-lg">Latest Movies</Text>
            <FlatList
              data={movies}
              scrollEnabled={false}
              renderItem={({ item }) => <MovieCard {...item} />}
              numColumns={3}
              columnWrapperClassName="gap-5"
              keyExtractor={(item) => item?.id.toString()}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
