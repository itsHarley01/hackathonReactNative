import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Screen1 from "../components/Screen1";
import Screen2 from "../components/Screen2";
import Screen3 from "../components/Screen3";
import Form from "../components/Form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarIcon = ({ focused, name }) => {
  return (
    <View>
      <Text style={{ color: focused ? "blue" : "gray" }}>{name}</Text>
    </View>
  );
};

const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://your-profile-image-url.com/profile.jpg" }}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Screen1") {
            iconName = "S1";
          } else if (route.name === "Screen2") {
            iconName = "S2";
          } else if (route.name === "Screen3") {
            iconName = "S3";
          }
          return <CustomTabBarIcon focused={focused} name={iconName} />;
        },
      })}
    >
      <Tab.Screen
        name="Screen1"
        component={Screen1}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Screen3"
        component={Screen3}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <CustomHeader />
      </View>
      <View style={{ flex: 1, marginTop: 50 }}>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Form"
            component={Form}
            options={{ headerTitle: "", headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0,
    borderBottomColor: "#ddd",
  },
  profileContainer: {
    marginTop: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    margin: 5,
    borderWidth: 2,
    borderColor: "#000",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
});
