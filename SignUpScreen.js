import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

const handleSignUp = async() => {
    if (!username || !password || !confirmPassword) {
        setErrorMessage('All fields are required');
    } else if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
    } else {
        console.log('Signup request received');
        await axios.post('http://localhost:3000/signup', {
            username: username,
            password: password,
        })
        .then((response) => {
            const data = response.data;
            if (data.error) {
                setErrorMessage(data.error);
            }else {
  navigation.navigate('Home', { username: username });
}
        })
        .catch((error) => {
          
            console.log(error.config);
        });
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

      <Text>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}

      <Button style={styles.signup} title="Sign Up" onPress={handleSignUp} />
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
  signup:{
    marginBottom:30
  }
});

export default SignUpScreen;
