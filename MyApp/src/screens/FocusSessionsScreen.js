import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons

const FocusSessionsScreen = () => {
  const [animation] = useState(new Animated.Value(1));
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [position] = useState(new Animated.Value(0));
  const [blinkDuration, setBlinkDuration] = useState(15);
  const [meditationDuration, setMeditationDuration] = useState(15);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const blinkIntervalRef = useRef(null);
  const breathIntervalRef = useRef(null);

  const startBlinkingAnimation = () => {
    setIsSessionActive(true);
    setMessage("Blink Your Eyes");
    setCount(blinkDuration);

    blinkIntervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          clearInterval(blinkIntervalRef.current);
          startMeditationPrompt();
          return 0;
        }
      });
    }, 1000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 0.5,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startMeditationPrompt = () => {
    setMessage("Inhale");
    setCount(meditationDuration);

    let isInhale = true;
    let cycleCount = meditationDuration;

    const breathCycle = () => {
      if (cycleCount <= 0) {
        clearTimeout(breathIntervalRef.current);
        setIsSessionActive(false);
        setMessage("");
        setCount(0);
        position.setValue(0);
        return;
      }

      setMessage(isInhale ? "Inhale" : "Exhale");
      setCount(3); // 3-second countdown for each breath phase

      Animated.timing(position, {
        toValue: isInhale ? 1 : 0,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      let innerCount = 3;
      const countdownInterval = setInterval(() => {
        innerCount--;
        setCount(innerCount);
        if (innerCount <= 0) {
          clearInterval(countdownInterval);
          isInhale = !isInhale;
          cycleCount--;
          breathCycle();
        }
      }, 1000);
    };

    breathCycle();

    breathIntervalRef.current = setTimeout(() => {
      clearTimeout(breathIntervalRef.current);
      setIsSessionActive(false);
      setMessage("");
      setCount(0);
      position.setValue(0);
    }, meditationDuration * 6000); // Total duration: meditationDuration * (3s inhale + 3s exhale)
  };

  const handleStartFocusSession = () => {
    if (!isSessionActive) {
      startBlinkingAnimation();
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(blinkIntervalRef.current);
      clearInterval(breathIntervalRef.current);
    };
  }, []);

  const translateX = position.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 50],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Focus Sessions Tracking</Text>
      <TouchableOpacity onPress={handleStartFocusSession} style={styles.button}>
        <Text style={styles.buttonText}>
          {isSessionActive ? "Session in Progress" : "Start Focus Session"}
        </Text>
      </TouchableOpacity>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Blink Duration:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={blinkDuration}
            style={styles.picker}
            onValueChange={(itemValue) => setBlinkDuration(itemValue)}
            enabled={!isSessionActive}
          >
            <Picker.Item label="15 sec" value={15} />
            <Picker.Item label="30 sec" value={30} />
            <Picker.Item label="1 min" value={60} />
            <Picker.Item label="2 min" value={120} />
          </Picker>
          <Icon
            name="arrow-drop-down"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Meditation Duration:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={meditationDuration}
            style={styles.picker}
            onValueChange={(itemValue) => setMeditationDuration(itemValue)}
            enabled={!isSessionActive}
          >
            <Picker.Item label="15 sec" value={15} />
            <Picker.Item label="30 sec" value={30} />
            <Picker.Item label="1 min" value={60} />
            <Picker.Item label="2 min" value={120} />
          </Picker>
          <Icon
            name="arrow-drop-down"
            size={24}
            color="#FFD700"
            style={styles.icon}
          />
        </View>
      </View>
      {message && (
        <>
          <Animated.Text style={[styles.message, { opacity: animation }]}>
            {message}
          </Animated.Text>
          {(message === "Inhale" || message === "Exhale") && (
            <Animated.View
              style={[styles.slider, { transform: [{ translateX }] }]}
            />
          )}
        </>
      )}
      {count > 0 && <Text style={styles.count}>{count}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  text: {
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: "#00796b",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  message: {
    fontSize: 24,
    color: "#FFD700",
    marginBottom: 10,
  },
  count: {
    fontSize: 48,
    color: "#FFD700",
  },
  slider: {
    width: 100,
    height: 10,
    backgroundColor: "#FFD700",
    marginTop: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 10,
  },
  pickerWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: 150,
    color: "#FFFFFF",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});

export default FocusSessionsScreen;
