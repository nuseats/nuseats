import React from 'react';
import { View } from 'react-native';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ReviewsScreen from '../Screens/ReviewsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import WinnersScreen from '../Screens/WinnersScreen';
// voting screen only comes from winner screen
import Icon from 'react-native-vector-icons/Feather';
import tw from 'twrnc';
import RandomReviewScreen from '../Screens/RandomReviewScreen';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Home', icon: 'home', type: 'feather' },
  { name: 'Review', icon: 'book-open', type: 'feather' },
  { name: 'Post', icon: 'plus-square', type: 'feather' },
  { name: 'Contest', icon: 'award', type: 'feather' },
  { name: 'Profile', icon: 'user', type: 'feather' },
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

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const tab = tabs.find(tab => tab.name === route.name);
          return tab ? renderIcon(tab.icon, tab.type) : null;
        },
        tabBarShowLabel: false, // hiding the words, just like instagram
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: tw.color('orange-500'),
          height: 60, 
          paddingBottom: 10, // greater than top padding because iphone 15
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
              Review: ReviewsScreen,
              Post: ReviewsScreen,
              Contest: WinnersScreen,
              Profile: ProfileScreen,
            }[tab.name]
          }
        />
      ))}
    </Tab.Navigator>
  );
};