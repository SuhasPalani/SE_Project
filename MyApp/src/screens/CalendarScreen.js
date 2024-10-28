import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskContext } from './TaskContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const CalendarScreen = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
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
      Alert.alert('Success', `Task ${taskToEdit ? 'updated' : 'added'} successfully!`);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  const getPriorityColor = (priorityOption, isSelected) => {
    const colors = {
      'Urgent and Important': ['#ff4c4c', '#ff8080'],
      'Important but Not Urgent': ['#ffb84d', '#ffd699'],
      'Urgent but Not Important': ['#ffe600', '#fff566'],
      'Not Urgent and Not Important': ['#4caf50', '#80e27e'],
    };
    return colors[priorityOption][isSelected ? 1 : 0];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{taskToEdit ? 'Edit Task' : 'Create Task'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>Select Due Date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}
      <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.timeButtonText}>Select Due Time</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            const currentTime = selectedTime || date;
            setShowTimePicker(false);
            setDate(currentTime);
          }}
        />
      )}
      <View style={styles.priorityContainer}>
        <Text style={styles.priorityLabel}>Set Priority:</Text>
        {['Urgent and Important', 'Important but Not Urgent', 'Urgent but Not Important', 'Not Urgent and Not Important'].map((priorityOption) => (
          <TouchableOpacity
            key={priorityOption}
            style={[
              styles.priorityOption,
              { backgroundColor: getPriorityColor(priorityOption, priority === priorityOption) }
            ]}
            onPress={() => setPriority(priorityOption)}
          >
            <Text style={styles.priorityText}>{priorityOption}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title={taskToEdit ? 'Update Task' : 'Add Task'} onPress={handleSaveTask} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  dateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  timeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  timeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  priorityContainer: {
    marginBottom: 20,
  },
  priorityLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priorityOption: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CalendarScreen;