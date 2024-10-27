import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SelfAssessmentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Self-Assessment & Feedback</Text>
    </View>
  );
};

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

export default SelfAssessmentScreen;
