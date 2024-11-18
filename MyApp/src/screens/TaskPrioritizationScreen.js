import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  StatusBar,
} from "react-native";
import { TaskContext } from "./TaskContext";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TaskPrioritizationScreen = () => {
  const { tasks, deleteTask, completeTask } = useContext(TaskContext);
  const navigation = useNavigation();
  const [points, setPoints] = useState(0);
  const [showPointsModal, setShowPointsModal] = useState(false);

  const renderTask = ({ item }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        style={[
          styles.task,
          { borderLeftColor: getPriorityColor(item.priority) },
        ]}
      >
        <View style={styles.taskHeader}>
          <Text style={styles.taskText}>{item.task}</Text>
          <Text
            style={[
              styles.taskPriority,
              { color: getPriorityColor(item.priority) },
            ]}
          >
            {item.priority}
          </Text>
        </View>
        <View style={styles.taskDates}>
          <Icon name="event" size={16} color="#666" />
          <Text style={styles.taskDate}>
            Created: {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.taskDates}>
          <Icon name="alarm" size={16} color="#666" />
          <Text style={styles.taskDate}>
            Due: {new Date(item.dueDate).toLocaleString()}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            style={styles.button}
          >
            <Icon name="edit" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={[styles.button, styles.deleteButton]}
          >
            <Icon name="delete" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleComplete(item)}
            style={[styles.button, styles.completeButton]}
          >
            <Icon name="check" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  };

  const handleEdit = (task) => {
    navigation.navigate("Calendar", { task });
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteTask(id), style: "destructive" },
      ],
      { cancelable: false }
    );
  };

  const handleComplete = (task) => {
    const earnedPoints = completeTask(task.id);
    if (earnedPoints) {
      setPoints(earnedPoints);
      setShowPointsModal(true);
      setTimeout(() => {
        setShowPointsModal(false);
        navigation.navigate("RewardsSystem", { points: earnedPoints });
      }, 2000);
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F0F0" />
      <Text style={styles.title}>Task Prioritization</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <Modal visible={showPointsModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Animatable.View animation="zoomIn" style={styles.modalContent}>
            <Icon name="stars" size={50} color="#FFD700" />
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalText}>You earned {points} points!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowPointsModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Modal>
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
    color: "#FFFFFF",
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  task: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
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
    color: "#333",
    flex: 1,
  },
  taskPriority: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
  },
  taskDates: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  taskDate: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  completeButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#FFFFFF",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskPrioritizationScreen;
