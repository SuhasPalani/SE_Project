import React from 'react';
import { View, Text, Button } from 'react-native';

const UserDashboardScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Dashboard</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default UserDashboardScreen;
