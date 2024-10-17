import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const SignupScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Signup Page</Text>
      <TextInput
        placeholder="Email"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 10 }}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('UserDashboard')}
      />
      <Text style={{ marginTop: 10 }}>
        Already a user? <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}>Login</Text>
      </Text>
    </View>
  );
};

export default SignupScreen;
