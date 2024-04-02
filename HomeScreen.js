import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ResultScreen from './ResultScreen'; // Import the ResultScreen component
import axios from 'axios';
const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [userAnswer, setUserAnswer] = useState('');
  const [gameResult, setGameResult] = useState(null);
console.log(username);
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNum1(generateRandomNumber());
      setNum2(generateRandomNumber());
      setUserAnswer('');
      setGameResult(null);
    });

    return unsubscribe;
  }, [navigation]);

  async function checkAnswer() {
    const sum = num1 + num2;
    const answer = parseInt(userAnswer);
    const result = answer === sum ? 'Correct!' : 'Incorrect!';
    
    if (result === 'Correct!') {
      try {
        const response = await axios.post('http://localhost:3000/leaderboard', {
          time: new Date().toISOString(),
          username: username,
          result: 'Correct'
        });
        console.log(response.data); // Log the response from the server
      } catch (error) {
        console.error('Error adding result to leaderboard:', error);
      }
    }
    
    navigation.navigate('Result', { gameResult: result });
  }
  
  
  return (
    <View style={[styles.container]}>
      <Text style={styles.numberText}>Number 1: {num1}</Text>
      <Text style={styles.numberText}>Number 2: {num2}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your answer"
        value={userAnswer}
        onChangeText={text => setUserAnswer(text)}
      />
      <Button title="Answer" onPress={checkAnswer} />
      {gameResult && (
        <ResultScreen navigation={navigation} gameResult={gameResult} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  correct: {
    backgroundColor: '#afd69b',
  },
  incorrect: {
    backgroundColor: '#d83131',
  },
});

export default HomeScreen;
