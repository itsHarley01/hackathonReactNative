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
import { loginUser, registerUser } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(true);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const navigation = useNavigation();

  const handleNavigate = (location) => {
    navigation.navigate(location);
  };

  const handleAuth = async () => {
    if (email && password) {
      try {
        const result = await loginUser(email, password);
        handleNavigate("Home");
        showToast("Login Successful");

        //Alert.alert("Login Successful", `Token: ${result.token}`);
      } catch (error) {
        setError(error.message + "ssss");
      }
    } else {
      setError("Please enter you email and password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity onPress={() => handleNavigate("SignUp")}>
        <Text style={styles.signUp}>Sign Up</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.btn} onPress={handleAuth}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>

    // <View style={{ padding: 20 }}>
    //   <TextInput
    //     placeholder="Email"
    //     value={email}
    //     onChangeText={setEmail}
    //     style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
    //   />
    //   <TextInput
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //     style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
    //   />
    //   <Button title={isLogin ? "Login" : "Register"} onPress={handleAuth} />
    //   <Button
    //     title={isLogin ? "Switch to Register" : "Switch to Login"}
    //     onPress={() => setIsLogin(!isLogin)}
    //   />
    // </View>
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
