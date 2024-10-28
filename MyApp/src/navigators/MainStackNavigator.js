import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import UserDashboardScreen from "../screens/UserDashboardScreen";
import CalendarScreen from "../screens/CalendarScreen";
import TaskPrioritizationScreen from "../screens/TaskPrioritizationScreen";
import RewardsSystemScreen from "../screens/RewardsSystemScreen";
import FocusSessionsScreen from "../screens/FocusSessionsScreen";
import ProductivityTipsScreen from "../screens/ProductivityTipsScreen";
import SelfAssessmentScreen from "../screens/SelfAssessmentScreen";
import { TaskProvider } from "../screens/TaskContext";

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login Page" }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: "Signup Page" }}
          />
          <Stack.Screen
            name="UserDashboard"
            component={UserDashboardScreen}
            options={{ title: "User Dashboard" }}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{ title: "Calendar & Task Creation" }}
          />
          <Stack.Screen
            name="TaskPrioritization"
            component={TaskPrioritizationScreen}
            options={{ title: "Task Prioritization" }}
          />
          <Stack.Screen
            name="RewardsSystem"
            component={RewardsSystemScreen}
            options={{ title: "Rewards System" }}
          />
          <Stack.Screen
            name="FocusSessions"
            component={FocusSessionsScreen}
            options={{ title: "Focus Sessions" }}
          />
          <Stack.Screen
            name="ProductivityTips"
            component={ProductivityTipsScreen}
            options={{ title: "Productivity Tips" }}
          />
          <Stack.Screen
            name="SelfAssessment"
            component={SelfAssessmentScreen}
            options={{ title: "Self Assessment" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}

export default MainStackNavigator;
