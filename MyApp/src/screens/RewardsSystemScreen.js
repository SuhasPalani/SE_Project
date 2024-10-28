// RewardsSystemScreen.js

import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TaskContext } from "./TaskContext";

const RewardsSystemScreen = () => {
  const { completedTasks } = useContext(TaskContext);

  // Calculate total points
  const totalPoints = completedTasks.reduce(
    (sum, task) => sum + task.points,
    0
  );

  // Define redemption items
  const items = [
    { id: "1", name: "Item A", cost: 500 },
    { id: "2", name: "Item B", cost: 750 },
    { id: "3", name: "Item C", cost: 1000 },
    { id: "4", name: "Item D", cost: 1500 },
    { id: "5", name: "Item E", cost: 2000 },
    { id: "6", name: "Item F", cost: 2500 },
  ];

  // Render each item
  const renderItem = ({ item }) => {
    const canRedeem = totalPoints >= item.cost;

    return (
      <TouchableOpacity
        style={[
          styles.itemFrame,
          canRedeem ? styles.redeemable : styles.nonRedeemable,
        ]}
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCost}>{item.cost} Points</Text>
        {canRedeem && (
          <Text style={styles.redeemText}>Available for Redeem</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Reward System</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.totalPoints}>Points: {totalPoints}</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={2} // Display items in 2 columns
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e0f7fa", // Light cyan background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00796b", // Teal color for the title
  },
  pointsContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  totalPoints: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796b", // Matching color
  },
  list: {
    paddingTop: 80, // To avoid overlapping with the points container
  },
  itemFrame: {
    width: "45%", // Set width for square frames
    height: 100, // Fixed height for squares
    margin: "2.5%", // Space between items
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  redeemable: {
    backgroundColor: "#c8e6c9", // Light green for redeemable items
  },
  nonRedeemable: {
    backgroundColor: "#ffccbc", // Light orange for non-redeemable items
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00695c", // Dark teal for item names
  },
  itemCost: {
    fontSize: 14,
    color: "#555",
  },
  redeemText: {
    fontSize: 12,
    color: "#388e3c", // Dark green for available
    marginTop: 5,
  },
});

export default RewardsSystemScreen;
