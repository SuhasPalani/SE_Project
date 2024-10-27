import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import UserDashboardScreen from '../screens/UserDashboardScreen';

// Placeholder screens for the new features
const TaskPrioritizationScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Task Prioritization & Deadline Management</Text>
  </View>
);
const FocusSessionsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Focus Sessions Tracking</Text>
  </View>
);
const CalendarScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Calendar & To-Do List</Text>
  </View>
);
const ProductivityTipsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Personalized Productivity Tips</Text>
  </View>
);
const RewardsSystemScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Rewards System</Text>
  </View>
);
const SelfAssessmentScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Self-Assessment & Feedback</Text>
  </View>
);

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login Page' }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ title: 'Signup Page' }} 
        />
        <Stack.Screen 
          name="UserDashboard" 
          component={UserDashboardScreen} 
          options={{ title: 'User Dashboard' }} 
        />
        <Stack.Screen 
          name="TaskPrioritization" 
          component={TaskPrioritizationScreen} 
          options={{ title: 'Task Prioritization & Deadline Management' }} 
        />
        <Stack.Screen 
          name="FocusSessions" 
          component={FocusSessionsScreen} 
          options={{ title: 'Focus Sessions Tracking' }} 
        />
        <Stack.Screen 
          name="Calendar" 
          component={CalendarScreen} 
          options={{ title: 'Calendar & To-Do List' }} 
        />
        <Stack.Screen 
          name="ProductivityTips" 
          component={ProductivityTipsScreen} 
          options={{ title: 'Personalized Productivity Tips' }} 
        />
        <Stack.Screen 
          name="RewardsSystem" 
          component={RewardsSystemScreen} 
          options={{ title: 'Rewards System' }} 
        />
        <Stack.Screen 
          name="SelfAssessment" 
          component={SelfAssessmentScreen} 
          options={{ title: 'Self-Assessment & Feedback' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default MainStackNavigator;
