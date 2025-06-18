import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';

const MovieCard = ({poster_path, id, title:movieTitle, vote_average, release_date}:Movie) => {
    const imgSrc = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "https://placehold.co/600x400/1a1a1a/FFFFFF.png";
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className='w-[30%] my-2'>
       <Image
          source={{
            uri: imgSrc
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
      <Text className='text-sm text-white mt-4' numberOfLines={1}>{movieTitle}</Text>
      <View className='flex flex-row gap-2'>
        <Image source={icons.star}/>
        <Text className='text-white font-bold'>{parseFloat((vote_average/2).toString()).toFixed(1)}</Text>
      </View>
        <Text className='text-white'>Year: {release_date?.split("-")?.[0]}</Text>
      </TouchableOpacity>
    </Link>
  );
}

export default MovieCard

const styles = StyleSheet.create({})