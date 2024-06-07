import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Screen1() {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("Form", { headerShown: false });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigate} style={styles.mainBtn}>
        <Text style={styles.btnText}>REPORT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainBtn: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100, // Fixed borderRadius value
    padding: 20, // Added padding for better button look
  },
  btnText: {
    color: "white",
    fontSize: 24, // Adjusted font size
  },
});
