import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ReviewsScreen from '../Screens/ReviewsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import WinnersScreen from '../Screens/WinnersScreen';
import VotingScreen from '../Screens/VotingScreen';
import Icon from 'react-native-vector-icons/Feather'; 
import tw from 'twrnc';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Home', icon: 'home', type: 'feather' },
  { name: 'Reviews', icon: 'star', type: 'feather' },
  { name: 'Profile', icon: 'user', type: 'feather' },
  { name: 'Winners', icon: 'trophy', type: 'feather' },
  { name: 'Vote', icon: 'thumbs-up', type: 'feather' },
];

const renderIcon = (icon, type) => {
  switch (type) {
    case 'ionicons':
      return <Icon name={icon} size={24} color="black" />;
    case 'fontawesome5':
      return <Icon name={icon} size={24} color="black" />;
    case 'feather':
      return <Icon name={icon} size={24} color="black" />;
    default:
      return <Icon name={icon} size={24} color="black" />;
  }
};

export default function BottomTabs () {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const tab = tabs.find(tab => tab.name === route.name);
          return tab ? renderIcon(tab.icon, tab.type) : null;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: tw.color('orange-500'),
        },
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={
            {
              Home: HomeScreen,
              Reviews: ReviewsScreen,
              Profile: ProfileScreen,
              Winners: WinnersScreen,
              Vote: VotingScreen,
            }[tab.name]
          }
          options={{ title: tab.name }}
        />
      ))}
    </Tab.Navigator>
  );
};