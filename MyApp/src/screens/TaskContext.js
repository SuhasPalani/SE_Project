import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); // New state for completed tasks

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const modifyTask = (modifiedTask) => {
    setTasks(tasks.map((task) => (task.id === modifiedTask.id ? modifiedTask : task)));
  };

  const completeTask = (id) => {
    const taskToComplete = tasks.find((task) => task.id === id);
    if (taskToComplete) {
      const completionDate = new Date();
      const dueDate = new Date(taskToComplete.dueDate);
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round((dueDate - completionDate) / oneDay);

      let points = 0;
      if (diffDays >= 3) points = 50;
      else if (diffDays === 2) points = 35;
      else if (diffDays === 1) points = 25;
      else if (diffDays === 0) points = 10;

      // Move task to completed tasks and remove from active tasks
      setCompletedTasks([...completedTasks, { ...taskToComplete, completionDate, points }]);
      deleteTask(id);

      return points; // Return points for the RewardsScreen
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, completedTasks, addTask, deleteTask, modifyTask, completeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
