import { Text, View, Button } from "react-native";
import * as React from 'react';

const HomeScreen = ({navigation}) => {
    return (
        <>
      <Text>Home</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}></Button>
        </>
        
    );
}

export default HomeScreen;