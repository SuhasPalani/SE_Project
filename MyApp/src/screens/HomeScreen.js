import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        HawkVision Scheduler
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" style={styles.subtitle}>
        Time Management and Productivity Maximizer
      </Animatable.Text>
      <Animatable.View animation="bounceIn" delay={500}>
        <Button
          title="Try Now"
          onPress={() => navigation.navigate('Login')}
          color="#4CAF50"
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Dark background for a sleek look
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0BEC5', // Light gray for subtitle
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
