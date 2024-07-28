import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import ReviewsScreen from '../Screens/ReviewsScreen';

const HomeStack = createStackNavigator();

function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Reviews" component={ReviewsScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNav;
