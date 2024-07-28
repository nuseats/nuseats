import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WinnersScreen from '../Screens/WinnersScreen';
import VotingScreen from '../Screens/VotingScreen';

const AwardsStack = createStackNavigator();

function AwardsStackNav() {
  return (
    <AwardsStack.Navigator screenOptions={{ headerShown: false }}>
      <AwardsStack.Screen name="Winners" component={WinnersScreen} />
      <AwardsStack.Screen name="Vote" component={VotingScreen} />
    </AwardsStack.Navigator>
  );
}

export default AwardsStackNav;
