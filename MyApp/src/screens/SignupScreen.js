import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import * as Animatable from "react-native-animatable";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    if (email === "teamindia@hawk.com" && password === "teamindia") {
      Alert.alert("Success", "Account created successfully", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } else {
      setErrorMessage("Failed to create account. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Signup Page
      </Animatable.Text>
      <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Button title="Sign Up" onPress={handleSignup} color="#4CAF50" />
      </Animatable.View>
      <Text style={styles.signupText}>
        Already a user?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  signupText: {
    marginTop: 10,
    color: "#B0BEC5",
  },
  signupLink: {
    color: "blue",
  },
});

export default SignupScreen;
