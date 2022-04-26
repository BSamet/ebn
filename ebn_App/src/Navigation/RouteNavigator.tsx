import SignInScreen from '../screens/SignInScreen/SignInScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DashBordClient from '../screens/Dashbord_Client/DashBordClient';

const RootStack = createNativeStackNavigator();

export const RouteNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen name="Login" component={SignInScreen} />
        <RootStack.Screen name="Client" component={DashBordClient} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigator;
