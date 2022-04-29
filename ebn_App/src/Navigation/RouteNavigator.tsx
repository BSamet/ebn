import SignInScreen from '../screens/SignInScreen/SignInScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DashBordClient from '../screens/Dashbord_Client/DashBordClient';
import DashBordCollecteur from '../screens/Dashbord_Collecteur/DashBordCollecteur';
import QrCodeScan from '../screens/QrCodeScan';

export type AuthRootParamList = {
  Login: undefined;
  Client: undefined;
  Collecteur: undefined;
  QrCodeScan: undefined;
};
const RootStack = createNativeStackNavigator<AuthRootParamList>();

export const RouteNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen name="Login" component={SignInScreen} />
        <RootStack.Screen name="Client" component={DashBordClient} />
        <RootStack.Screen name="Collecteur" component={DashBordCollecteur} />
        <RootStack.Screen name="QrCodeScan" component={QrCodeScan} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigator;
