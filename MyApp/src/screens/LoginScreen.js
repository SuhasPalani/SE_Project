import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import * as Animatable from "react-native-animatable";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (email === "teamindia@hawk.com" && password === "teamindia") {
      navigation.navigate("UserDashboard");
    } else {
      setErrorMessage("Invalid email or password");
      // You can also use Alert to show a popup message
      // Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Login Page
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
        <Button title="Login" onPress={handleLogin} color="#4CAF50" />
      </Animatable.View>
      <Text style={styles.signupText}>
        New user?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign up
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

export default LoginScreen;
