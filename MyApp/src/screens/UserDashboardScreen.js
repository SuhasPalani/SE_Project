import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserDashboardScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing user session)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TaskPrioritization')}
      >
        <Text style={styles.buttonText}>Task Prioritization & Deadline Management</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FocusSessions')}
      >
        <Text style={styles.buttonText}>Focus Sessions Tracking</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Calendar')}
      >
        <Text style={styles.buttonText}>Calendar & To-Do List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductivityTips')}
      >
        <Text style={styles.buttonText}>Personalized Productivity Tips</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RewardsSystem')}
      >
        <Text style={styles.buttonText}>Rewards System</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SelfAssessment')}
      >
        <Text style={styles.buttonText}>Self-Assessment & Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    marginTop: 20,
  },
});

export default UserDashboardScreen;
