import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const userData = {
      name: name,
      username: name,
      email: email,
      password: password,
    };
  
    console.log('Registering:', userData);
  
    try {
      const response = await fetch(`http://localhost:5000/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();

        if (data.token) {
          const token = data.token;
          console.log('Register successful! Token:', token);
          navigation.navigate('Main');
        } else {
          console.log('Token not found in response:', data);
        }
        
      } else {
        console.log('Register failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
          title="Register" 
          onPress={handleRegister}
          color="#FF7A00" />
      </View>
      <View style={styles.button}>
        <Button
          title="Back to login"
          onPress={() => navigation.navigate('Login')} 
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

export default RegisterScreen;