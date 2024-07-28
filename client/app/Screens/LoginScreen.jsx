import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userData = {
      email: email,
      password: password,
    };
  
    console.log('Logging in with:', userData);
  
    try {
      const response = await fetch(`http://localhost:5000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response

        if (data.token) {
          const token = data.token;
          console.log('Login successful! Token:', token);
          navigation.navigate('Main');
          // Save the token to AsyncStorage or Redux state for future use
          await AsyncStorage.setItem('token', token);
        } else {
          console.log('Token not found in response:', data);
        }
      } else {
        console.log('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NUS Eats</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.button}>
        <Button 
          title="Login" 
          color="#FF7A00"
          onPress={handleLogin} />
      </View>
      <View style={styles.button}>
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')} 
        color="#FF7A00" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    margin: 4
  }
});

export default LoginScreen;