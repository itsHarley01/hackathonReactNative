import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { sendMessage } from "../services/api";
import * as Location from "expo-location";
import axios from "../services/axios";

const Form = () => {
  const [step, setStep] = useState(1);
  const [emergencyType, setEmergencyType] = useState(null);
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  const navigation = useNavigation();

  const handleNavigate = (location) => {
    navigation.navigate(location);
  };

  const handleEmergency = (type) => {
    console.log(`Selected emergency type: ${type}`);
    setEmergencyType(type);
    setStep(2);
  };

  const handleConfirmLocation = async () => {
    setLocationConfirmed(true);
    setStep(3);
    try {
      await sendMessage("cebu", "cebu");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSendSms = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const from = "Your Sender ID"; // Replace with your sender ID

    axios
      .post("http://your-backend-url/api/send-sms", {
        // Replace with your backend URL
        from,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        emergencyType,
      })
      .then((response) => {
        if (response.data.success) {
          Alert.alert("Message sent successfully!");
        } else {
          Alert.alert("Failed to send message:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleGoBack = () => {
    setStep(1);
    setEmergencyType(null);
    setLocationConfirmed(false);
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>What type of emergency?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEmergency("Fire")}
            >
              <Text style={styles.buttonText}>Fire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEmergency("Crime")}
            >
              <Text style={styles.buttonText}>Crime</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEmergency("Vehicular Accidents")}
            >
              <Text style={styles.buttonText}>Vehicular Accidents</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEmergency("Other Incidents")}
            >
              <Text style={styles.buttonText}>Other Incidents</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {step === 2 && (
        <>
          <Text style={styles.title}>Confirm Location</Text>
          {/* Location confirmation UI */}
          <TouchableOpacity style={styles.button} onPress={handleSendSms}>
            <Text style={styles.buttonText}>Confirm Location</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 3 && (
        <>
          <Text style={styles.title}>HELP IS ON THE WAY</Text>
          <Text style={styles.message}>
            KEEP CALM {"\n"} AND {"\n"} PLEASE VACATE {"\n"} THE AREA
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate("Screen1")}
          >
            <Text style={styles.buttonText}>Back to homescreen</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.topButton}
        onPress={() => handleNavigate("Screen1")}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: "80%",
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  topButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 100,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default Form;
