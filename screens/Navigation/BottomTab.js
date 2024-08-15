import React from 'react';
import Dashboard from '../Dashboard';
import Screen2 from '../Screen2';
import Screen3 from '../Screen3';
import Screen4 from '../Screen4';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import profile from '../profile';
import Wallet from '../Wallet';
import Rslect from '../Rslect';

const Tab = createBottomTabNavigator();

export default function DashboardTab() {
  return (
    <Tab.Navigator
      initialRouteName="Amwaj"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Amwaj') {
            iconName = 'home';
          } else if (route.name === 'Jobs') {
            iconName = 'briefcase';
          } else if (route.name === 'Normal') {
            iconName = 'grid';
          } else if (route.name === 'Wallet') {
            iconName = 'dollar-sign';
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
          } else if (route.name === 'Person') {
            iconName = 'user';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        //tabBarStyle: { height: 80 }, // Adjust the style as needed
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#b59ecc',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          height: 80,
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },

      })}
    >
      <Tab.Screen name="Amwaj" component={Dashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Jobs" component={Screen2} options={{ headerShown: false }} />
      <Tab.Screen name="Normal" component={Screen3} options={{ headerShown: false }} />
      <Tab.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
      <Tab.Screen name="Person" component={profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
