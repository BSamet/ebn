import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {} from 'react-native/Libraries/NewAppScreen';

import DashBordClient from './src/screens/Dashbord_Client';
import DashBordCollecteur from './src/screens/Dashbord_Collecteur';
import HistoriqueClient from './src/screens/Historique_Client';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import {Icon} from '@rneui/themed';

export type AuthRootParamList = {
  Login: undefined;
  Client: undefined;
  Collecteur: undefined;
  QrCodeScan: undefined;
  Historique: undefined;
  Home: undefined;
};
const RootStack = createNativeStackNavigator<AuthRootParamList>();
const Tab = createBottomTabNavigator();
// ajouter ici les différents routes dans NavTab pour la bottomNav

const NavTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#8AC997',
      }}>
      <Tab.Screen
        name="Dashbord"
        component={DashBordClient}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashbord',
          tabBarIcon: () => <Icon name="desktop-outline" type="ionicon" />,
        }}
      />
      <Tab.Screen
        name="Historique"
        component={HistoriqueClient}
        options={{
          headerShown: false,
          tabBarLabel: 'Historique',
          tabBarIcon: () => <Icon name="receipt-outline" type="ionicon" />,
        }}
      />
      <Tab.Screen
        name="Déconnexion"
        component={SignInScreen}
        options={{
          tabBarStyle: {display: 'none'},
          headerShown: false,
          tabBarLabel: 'Exit',
          tabBarIcon: () => <Icon name="enter-outline" type="ionicon" />,
        }}
      />
    </Tab.Navigator>
  );
};

// Ajouter ici les redirections via bouton/link
const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen
          name="Login"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Client"
          component={NavTab}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Collecteur"
          component={DashBordCollecteur}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
