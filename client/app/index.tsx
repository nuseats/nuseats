import { Text, View } from "react-native";
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import VotingScreen from './Screens/VotingScreen';
import WinnersScreen from './Screens/WinnersScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ReviewsScreen from './Screens/ReviewsScreen';

const Stack = createNativeStackNavigator();

export default function Index() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Pick a Canteen!'}}
          />
          <Stack.Screen
            name="Reviews"
            component={ReviewsScreen}
            options={{ title: 'Reviews' }}
          />
          <Stack.Screen name = "Profile" component= {ProfileScreen} />
          <Stack.Screen name = "Winners" component = {WinnersScreen} options = {{title: 'Eaters of the Month'}}/>
          <Stack.Screen name = "Vote" component = {VotingScreen} options = {{title: 'Vote'}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
  }