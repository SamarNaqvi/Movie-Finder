import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { icons } from "@/constants/icons";

interface Props {
  onPress?: () => void;
  placeHolderText: string;
  value?: string;
  onChange?: (props: any) => void;
}

const SearchBar = ({
  value = "",
  onPress,
  placeHolderText,
  onChange,
}: Props) => {



  return (
      <View className="border border-solid border-purple-500 bg-dark-200 px-4 py-1.5 rounded-full flex flex-row gap-5 items-center">
        <Image
          source={icons.search}
          tintColor={"#AB8BFF"}
          resizeMode="contain"
        />
        <TextInput
          className="text-purple-300 w-full"
          placeholder={placeHolderText}
          value={value}
          onChangeText={onChange}
          onPress={onPress}
          placeholderTextColor={"#AB8BFF"}
          autoFocus
        />
      </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
