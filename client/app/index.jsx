import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import BottomTabs from './components/BottomTabs';

const Stack = createNativeStackNavigator();

export default function Index() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
      </Stack.Navigator>
    );
  }