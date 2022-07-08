import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {} from 'react-native/Libraries/NewAppScreen';

import DashBordClient from './src/screens/Dashbord_Client';
import DashBordCollecteur from './src/screens/Dashbord_Collecteur';
import HistoriqueClient from './src/screens/Historique_Client';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

import {LogBox} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
])

export type AuthRootParamList = {
  Login: undefined;
  Client: undefined;
  Collecteur: undefined;
  QrCodeScan: undefined;
  Historique: undefined;
  Home: undefined;
};

const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e);
    }
};

const RootStack = createNativeStackNavigator<AuthRootParamList>();
const Tab = createBottomTabNavigator();
// ajouter ici les différents routes dans NavTab pour la bottomNav

const NavTabClient = ({navigation}:any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#8AC997',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashBordClient}
        options={{
          headerShown: false,
          tabBarLabel: 'Tableau de bord',
            tabBarLabelStyle: {
                fontSize: 12,
            },
          tabBarIcon: () => <Icon
              raised
              size={25}
              name='home'
              type='font-awesome'
              color='#8AC997'/>,
        }}
      />
      <Tab.Screen
        name="Historique"
        component={HistoriqueClient}
        options={{
          headerShown: false,
          tabBarLabel: 'Historique',
            tabBarLabelStyle: {
                fontSize: 12,
            },
          tabBarIcon: () => <Icon
              raised
              size={25}
              name='history'
              type='font-awesome'
              color='#8AC997'/>,
        }}
      />
      <Tab.Screen
        name="Déconnexion"
        component={SignInScreen}
        listeners={{
            tabPress: () => navigation.dispatch(StackActions.popToTop(), clearAll())
        }}
        options={{
          tabBarStyle: {display: 'none'},
          headerShown: false,
          tabBarLabel: 'Déconnexion',
            tabBarLabelStyle: {
                fontSize: 12,
            },
          tabBarIcon: () => <Icon
              raised
              size={25}
              name='sign-out'
              type='font-awesome'
              color='#ff0000'
              />,
        }}
      />
    </Tab.Navigator>
  );
};

const NavTabCollecteur = ({navigation}:any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#8AC997',
      }}
    >
      <Tab.Screen
        name="Dashbord"
        component={DashBordCollecteur}
        options={{
          headerShown: false,
            tabBarLabel: 'Tableau de bord',
            tabBarLabelStyle: {
                fontSize: 12,
            },
            tabBarIcon: () => <Icon
                raised
                size={25}
                name='home'
                type='font-awesome'
                color='#8AC997'/>,
        }}
      />
      <Tab.Screen
        name="Déconnexion"
        component={SignInScreen}
        listeners={{
            tabPress: () => navigation.dispatch(StackActions.popToTop(), clearAll())
        }}
        options={{
          tabBarStyle: {display: 'none'},
          headerShown: false,
            tabBarLabel: 'Déconnexion',
            tabBarLabelStyle: {
                fontSize: 12,
            },
            tabBarIcon: () => <Icon
                raised
                size={25}
                name='sign-out'
                type='font-awesome'
                color='#ff0000'
                />,
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
          component={NavTabClient}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Collecteur"
          component={NavTabCollecteur}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
