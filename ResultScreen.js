import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Leaderboard from './Leaderboard';

const ResultScreen = ({ navigation, route }) => {
  const { gameResult } = route.params; 

  return (
    <View style={[styles.container, gameResult === 'Correct!' ? styles.correct : styles.incorrect]}>
      <Text style={styles.resultText}>{gameResult}</Text>
      <Leaderboard />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Next" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  correct: {
    backgroundColor: '#afd69b',
  },
  incorrect: {
    backgroundColor: '#d83131',
  },
  buttonContainer: {
    margin: 20,
  },
  button: {
    fontSize: 18, // Adjust the font size as needed
  },
});

export default ResultScreen;
