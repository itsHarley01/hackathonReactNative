import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../services/api";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (email && password && password && conPassword) {
      if (conPassword == password) {
        try {
          const result = await registerUser(email, password);
          showToast("Registration succesfull");
          handleNavigate("Login");
          //Alert.alert("Registration Successful", `UID: ${result.uid}`);
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError("password did not match you type");
      }
    } else {
      setError("please input all required fields");
    }
  };

  // const handleSignUp = () => {
  //   try {
  //     const response = api.post("/api/auth/register", {
  //       email,
  //       password,
  //       name,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  const handleNavigate = (location) => {
    navigation.navigate(location);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={conPassword}
        onChangeText={setConPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => handleNavigate("Login")}>
        <Text>Sign up</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: "5%",
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  btn: {
    width: "50%",
    backgroundColor: "maroon",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});
