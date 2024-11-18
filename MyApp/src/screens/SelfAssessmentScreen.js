import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import { TaskContext } from "./TaskContext";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelfAssessmentScreen = () => {
  const { completedTasks, setCompletedTasks } = useContext(TaskContext);
  const [localCompletedTasks, setLocalCompletedTasks] = useState([]);

  useEffect(() => {
    loadCompletedTasks();
  }, []);

  useEffect(() => {
    setLocalCompletedTasks(completedTasks);
  }, [completedTasks]);

  const loadCompletedTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("completedTasks");
      if (storedTasks !== null) {
        const parsedTasks = JSON.parse(storedTasks);
        setCompletedTasks(parsedTasks);
      }
    } catch (error) {
      console.error("Error loading completed tasks:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent and Important":
        return "#FF4136";
      case "Important but Not Urgent":
        return "#FF851B";
      case "Urgent but Not Important":
        return "#FFDC00";
      case "Not Urgent and Not Important":
        return "#2ECC40";
      default:
        return "#AAAAAA";
    }
  };

  const renderTask = ({ item, index }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={index * 100}
        style={[
          styles.task,
          { borderLeftColor: getPriorityColor(item.priority) },
        ]}
      >
        <View style={styles.taskHeader}>
          <Text style={styles.taskText}>{item.task}</Text>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(item.priority) },
            ]}
          >
            <Text style={styles.priorityText}>{item.priority}</Text>
          </View>
        </View>
        <View style={styles.taskInfo}>
          <Icon name="event" size={16} color="#666" />
          <Text style={styles.taskDate}>
            Completed: {new Date(item.completionDate).toLocaleString()}
          </Text>
        </View>
        <View style={styles.taskInfo}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.pointsText}>Points Earned: {item.points}</Text>
        </View>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E1E" />
      <Text style={styles.title}>Self-Assessment</Text>
      <FlatList
        data={localCompletedTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFF",
    textAlign: "center",
  },
  task: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#2C2C2C",
    borderLeftWidth: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  taskDate: {
    fontSize: 14,
    color: "#B0B0B0",
    marginLeft: 5,
  },
  pointsText: {
    fontSize: 14,
    color: "#B0B0B0",
    fontWeight: "bold",
    marginLeft: 5,
  },
  list: {
    paddingBottom: 20,
  },
});

export default SelfAssessmentScreen;
