import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import {StatusBar} from 'expo-status-bar';
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Username and password are required');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: username,
          password: password,
        });
        if (response.data.success) {
            navigation.navigate('Home', { username: username });
        } else {
          setErrorMessage('Invalid username or password');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred while logging in');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}

      <Button title="Login" onPress={handleLogin} />
      <View style={styles.signupContainer}>
        <Button title="Sign Up" onPress={() => {navigation.navigate('SignUp')}} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  signupContainer: {
    position: 'absolute',
    bottom: 20,
  },
});

export default LoginScreen;
