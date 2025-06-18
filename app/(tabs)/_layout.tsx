import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabComp = ({
  title,
  imgSrc,
  focused,
}: {
  title: string;
  imgSrc: any;
  focused: boolean;
}) => {
  if (focused) {
    return (
      <>
        <ImageBackground
          className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden gap-2"
          source={images.highlight}
        >
          <Image source={imgSrc} tintColor="#151312" className="size-5" />
          <Text>{title}</Text>
        </ImageBackground>
      </>
    );
  } else {
    return (
      <View className="d-flex items-center justify-center mt-4 rounded-full size-full">
        <Image source={imgSrc} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  }
};
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 40,
          overflow: "hidden",
          position:"absolute",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabComp title="Home" imgSrc={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabComp title="Search" imgSrc={icons.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Save"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabComp title="Save" imgSrc={icons.save} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabComp title="Profile" imgSrc={icons.person} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
