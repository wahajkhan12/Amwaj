import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardTab from './BottomTab';
import Logout from '../Logout';
import AboutUs from '../AboutUs';
import FAQS from '../FAQS';
import Terms from '../Terms';
import Privacy from '../Privacy';
import Contacts from '../Contacts';
import Help from '../Help';
import Complaints from '../Complaints';
import Gslect from '../Gslect';
import Share from '../Share';

// Import icons from your preferred icon library
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
//import { startAt } from 'firebase/database';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator >
      <Drawer.Screen
        name="Home"
        component={DashboardTab}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FAQs"
        component={FAQS}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="question-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms"
        component={Terms}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="file-text-o" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy"
        component={Privacy}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="privacy-tip" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contacts"
        component={Contacts}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="address-book-o" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="help-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Complaints"
        component={Complaints}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="report" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Offers"
        component={Gslect}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Share"
        component={Share}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="share" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
