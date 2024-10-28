import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { WebView } from 'react-native-webview';

const articles = [
  { id: '1', title: 'How to Be More Productive as a Student', url: 'https://www.columbiasouthern.edu/blog/blog-articles/2024/february/how-to-be-more-productive-as-a-student/' },
  { id: '2', title: '9 Simple Productivity Tips for College Students', url: 'https://www.apu.edu/articles/9-simple-productivity-tips-for-college-students/' },
];

const ProductivityTipsScreen = () => {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [animation] = useState(new Animated.Value(1));

  const handleArticlePress = () => {
    // Randomly select an article
    const randomArticle = articles[Math.floor(Math.random() * articles.length)];
    setSelectedUrl(randomArticle.url);
    
    // Trigger animation
    Animated.spring(animation, {
      toValue: 1.2, // Scale up
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(animation, {
        toValue: 1, // Scale down
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleClosePress = () => {
    setSelectedUrl(null); // Reset the URL to go back to the main content
  };

  return (
    <View style={styles.container}>
      {selectedUrl ? (
        <View style={styles.webviewContainer}>
          <WebView source={{ uri: selectedUrl }} style={styles.webview} />
          <TouchableOpacity onPress={handleClosePress} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <Animated.View style={{ transform: [{ scale: animation }] }}>
            <TouchableOpacity onPress={handleArticlePress} style={styles.button}>
              <Text style={styles.buttonText}>What's New Today?</Text>
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.text}>Personalized Productivity Tips</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#00796b',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  webviewContainer: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    bottom: 40, // Position at the bottom
    right: 20, // Position on the right
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ProductivityTipsScreen;
