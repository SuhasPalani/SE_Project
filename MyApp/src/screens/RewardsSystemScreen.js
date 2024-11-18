import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { TaskContext } from "./TaskContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RewardsSystemScreen = () => {
  const { completedTasks, setCompletedTasks } = useContext(TaskContext);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    loadPoints();
  }, []);

  useEffect(() => {
    updateTotalPoints();
  }, [completedTasks]);

  const loadPoints = async () => {
    try {
      const storedPoints = await AsyncStorage.getItem("totalPoints");
      if (storedPoints !== null) {
        setTotalPoints(parseInt(storedPoints, 10));
      } else {
        updateTotalPoints();
      }
    } catch (error) {
      console.error("Error loading points:", error);
    }
  };

  const updateTotalPoints = () => {
    const points = completedTasks.reduce((sum, task) => sum + task.points, 0);
    setTotalPoints(points);
    AsyncStorage.setItem("totalPoints", points.toString());
  };

  const rewardItems = {
    "50 Points": [
      { id: "1", name: "Snack Pack", cost: 50 },
      { id: "2", name: "School Supplies", cost: 50 },
      { id: "3", name: "Water Bottle", cost: 50 },
      { id: "4", name: "Lanyard or Keychain", cost: 50 },
      { id: "5", name: "Stickers Pack", cost: 50 },
    ],
    "75 Points": [
      { id: "6", name: "Movie Night", cost: 75 },
      { id: "7", name: "Coffee Shop Gift Card", cost: 75 },
      { id: "8", name: "Board Game", cost: 75 },
      { id: "9", name: "Personalized Mug", cost: 75 },
      { id: "10", name: "Puzzle", cost: 75 },
    ],
    "100 Points": [
      { id: "11", name: "Gift Card", cost: 100 },
      { id: "12", name: "Bluetooth Speaker", cost: 100 },
      { id: "13", name: "Fitness Class Pass", cost: 100 },
      { id: "14", name: "Book", cost: 100 },
      { id: "15", name: "Tech Accessory", cost: 100 },
    ],
    "150 Points": [
      { id: "16", name: "Concert Ticket", cost: 150 },
      { id: "17", name: "Tech Gadgets", cost: 150 },
      { id: "18", name: "Weekend Activity Pass", cost: 150 },
      { id: "19", name: "Gift Basket", cost: 150 },
      { id: "20", name: "Subscription Service", cost: 150 },
    ],
    "200 Points": [
      { id: "21", name: "Laptop Bag", cost: 200 },
      { id: "22", name: "Smartwatch", cost: 200 },
      { id: "23", name: "Weekend Getaway", cost: 200 },
      { id: "24", name: "Online Course Access", cost: 200 },
      { id: "25", name: "Fitness Tracker", cost: 200 },
    ],
  };

  const handleRedeem = async (item) => {
    if (totalPoints >= item.cost) {
      const newTotalPoints = totalPoints - item.cost;
      setTotalPoints(newTotalPoints);
      await AsyncStorage.setItem("totalPoints", newTotalPoints.toString());

      // Update completed tasks to reflect the spent points
      const updatedTasks = completedTasks.map((task) => ({
        ...task,
        points: Math.max(
          0,
          task.points - Math.floor(item.cost / completedTasks.length)
        ),
      }));
      setCompletedTasks(updatedTasks);

      Alert.alert("Success", `You have redeemed ${item.name}!`);
    } else {
      Alert.alert(
        "Insufficient Points",
        "You don't have enough points to redeem this item."
      );
    }
  };

  const renderItem = ({ item }) => {
    const canRedeem = totalPoints >= item.cost;

    return (
      <TouchableOpacity
        style={[
          styles.itemFrame,
          canRedeem ? styles.redeemable : styles.nonRedeemable,
        ]}
        onPress={() => handleRedeem(item)}
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCost}>{item.cost} Points</Text>
        {canRedeem && <Text style={styles.redeemText}>Tap to Redeem</Text>}
      </TouchableOpacity>
    );
  };

  const renderCategory = ([category, items]) => (
    <View style={styles.categoryFrame} key={category}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Task Reward System</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.totalPoints}>Total Points: {totalPoints}</Text>
      </View>
      {Object.entries(rewardItems).map(renderCategory)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1e1e1e",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00796b",
  },
  pointsContainer: {
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  totalPoints: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796b",
  },
  categoryFrame: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#2c2c2c",
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 10,
  },
  itemFrame: {
    width: 150,
    height: 120,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  redeemable: {
    backgroundColor: "#2e7d32",
  },
  nonRedeemable: {
    backgroundColor: "#424242",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  itemCost: {
    fontSize: 12,
    color: "#b0bec5",
    marginTop: 5,
  },
  redeemText: {
    fontSize: 12,
    color: "#81c784",
    marginTop: 5,
  },
});

export default RewardsSystemScreen;
