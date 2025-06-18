import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { getSavedMovies } from "../services/appWrite";
import { icons } from "@/constants/icons";
import MovieCard from "../components/MovieCard";
import { images } from "@/constants/images";
import { useIsFocused } from "@react-navigation/native";

const Save = () => {
  const {
    data: savedMovies,
    loading,
    error,
    refetch,
  } = useFetch(() => getSavedMovies());
const isFocused = useIsFocused();

useEffect(()=>{
  isFocused && refetch();
},[isFocused]);

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
            <Text className="text-white my-2 text-lg">Saved Movies</Text>
            <FlatList
              data={savedMovies}
              scrollEnabled={false}
              //@ts-ignore
              renderItem={({ item }) => <MovieCard {...item} />}
              numColumns={3}
              columnWrapperClassName="gap-5"
              keyExtractor={(item) => item?.movie_id.toString()}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({});
