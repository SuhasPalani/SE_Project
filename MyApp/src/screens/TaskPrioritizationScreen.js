import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
} from "react-native";
import { TaskContext } from "./TaskContext";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const TaskPrioritizationScreen = () => {
  const { tasks, deleteTask, modifyTask, completeTask } =
    useContext(TaskContext);
  const navigation = useNavigation();
  const [points, setPoints] = useState(0);
  const [showPointsModal, setShowPointsModal] = useState(false);

  const renderTask = ({ item }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        style={[styles.task, { borderColor: getPriorityColor(item.priority) }]}
      >
        <Text style={styles.taskText}>{item.task}</Text>
        <Text style={styles.taskPriority}>{item.priority}</Text>
        <Text style={styles.taskDate}>
          Created: {item.date.toLocaleString()}
        </Text>
        <Text style={styles.taskDate}>
          Due: {item.dueDate.toLocaleString()}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleComplete(item)}
            style={styles.completeButton}
          >
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
        { text: "OK", onPress: () => deleteTask(id) },
      ],
      { cancelable: false }
    );
  };

  const handleComplete = (task) => {
    const earnedPoints = completeTask(task.id); // Get points returned from completeTask
    if (earnedPoints) {
      setPoints(earnedPoints);
      setShowPointsModal(true);

      // Optional: Delay navigation if you want the modal to stay open
      setTimeout(() => {
        setShowPointsModal(false);
        navigation.navigate("RewardsSystem", { points: earnedPoints }); // Pass points to the RewardsScreen
      }, 2000); // Display modal for 2 seconds
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent and Important":
        return "red";
      case "Important but Not Urgent":
        return "orange";
      case "Urgent but Not Important":
        return "yellow";
      case "Not Urgent and Not Important":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Task Prioritization & Deadline Management
      </Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <Modal visible={showPointsModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Congratulations!</Text>
            <Text style={styles.modalText}>You earned {points} points!</Text>
            <Button title="Close" onPress={() => setShowPointsModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  task: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 10,
  },
  taskText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskPriority: {
    fontSize: 14,
    color: "#777",
  },
  taskDate: {
    fontSize: 12,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4caf50",
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 5,
    borderRadius: 5,
  },
  completeButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
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
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default TaskPrioritizationScreen;
