import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as Screens from '../screens/index'
import navigationString from '../constants/navigationString';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false}}>
      <Stack.Screen name={navigationString.HOME} component={Screens.Home}/>
      <Stack.Screen name={navigationString.DETAILS} component={Screens.Detail}  />
    </Stack.Navigator>
  );
};

export default StackNavigator;