import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TaskContext } from "./TaskContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CalendarScreen = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const { addTask, modifyTask } = useContext(TaskContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { task: taskToEdit } = route.params || {};

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setPriority(taskToEdit.priority);
      setDate(new Date(taskToEdit.dueDate));
    }
  }, [taskToEdit]);

  const handleSaveTask = () => {
    if (task && priority) {
      const newTask = {
        id: taskToEdit ? taskToEdit.id : Date.now().toString(),
        task,
        priority,
        date: taskToEdit ? taskToEdit.date : new Date(),
        dueDate: date,
      };
      if (taskToEdit) {
        modifyTask(newTask);
      } else {
        addTask(newTask);
      }
      Alert.alert(
        "Success",
        `Task ${taskToEdit ? "updated" : "added"} successfully!`
      );
      navigation.goBack();
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  const getPriorityColor = (priorityOption) => {
    const colors = {
      "Urgent and Important": "#FF4136",
      "Important but Not Urgent": "#FF851B",
      "Urgent but Not Important": "#FFDC00",
      "Not Urgent and Not Important": "#2ECC40",
    };
    return colors[priorityOption];
  };

  const renderDateTimePicker = (mode) => (
    <DateTimePicker
      value={date}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={(event, selectedDate) => {
        const currentDate = selectedDate || date;
        mode === "date" ? setShowDatePicker(false) : setShowTimePicker(false);
        setDate(currentDate);
      }}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {taskToEdit ? "Edit Task" : "Create Task"}
      </Text>
      <View style={styles.inputContainer}>
        <Icon
          name="assignment"
          size={24}
          color="#007AFF"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your task"
          value={task}
          onChangeText={setTask}
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity
        style={styles.dateTimeButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Icon name="event" size={24} color="#FFF" />
        <Text style={styles.dateTimeButtonText}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && renderDateTimePicker("date")}
      <TouchableOpacity
        style={styles.dateTimeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Icon name="access-time" size={24} color="#FFF" />
        <Text style={styles.dateTimeButtonText}>
          {date.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
      {showTimePicker && renderDateTimePicker("time")}
      <Text style={styles.priorityLabel}>Set Priority:</Text>
      <View style={styles.priorityContainer}>
        {[
          "Urgent and Important",
          "Important but Not Urgent",
          "Urgent but Not Important",
          "Not Urgent and Not Important",
        ].map((priorityOption) => (
          <TouchableOpacity
            key={priorityOption}
            style={[
              styles.priorityOption,
              { backgroundColor: getPriorityColor(priorityOption) },
              priority === priorityOption && styles.selectedPriority,
            ]}
            onPress={() => setPriority(priorityOption)}
          >
            <Text style={styles.priorityText}>{priorityOption}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <Text style={styles.saveButtonText}>
          {taskToEdit ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#1E1E1E",
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateTimeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  priorityLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  priorityContainer: {
    marginBottom: 20,
  },
  priorityOption: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedPriority: {
    borderWidth: 2,
    borderColor: "#000",
  },
  priorityText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CalendarScreen;
