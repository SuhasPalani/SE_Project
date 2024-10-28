// SelfAssessmentScreen.js

import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TaskContext } from './TaskContext';

const SelfAssessmentScreen = () => {
  const { completedTasks } = useContext(TaskContext);

  const renderTask = ({ item }) => {
    return (
      <View style={styles.task}>
        <Text style={styles.taskText}>{item.task}</Text>
        <Text style={styles.taskPriority}>{item.priority}</Text>
        <Text style={styles.taskDate}>Completed: {new Date(item.completionDate).toLocaleString()}</Text>
        <Text style={styles.pointsText}>Points Earned: {item.points}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Self-Assessment</Text>
      <FlatList
        data={completedTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor uses string
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  task: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskPriority: {
    fontSize: 14,
    color: '#777',
  },
  taskDate: {
    fontSize: 12,
    color: '#555',
  },
  list: {
    paddingBottom: 20,
  },
});

export default SelfAssessmentScreen;
