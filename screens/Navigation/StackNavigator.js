import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Drawer from './Drawer';
import Dashboard from '../Dashboard';
import UrgentMaintenance from '../UrgentM';
import Bills from '../Bills';
import GuestsCar from '../GuestsCar';
import Electricity from '../Electricity';
import Conditioning from '../Conditioning';
import Painter from '../Painter';
import ElectricDevices from '../ElectricDevices';
import ITdevices from '../ITdevices';
import Plumber from '../Plumber';
import bOffers from '../bOffers';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../AuthContext';
import Parse from "parse/react-native.js";
import 'react-native-get-random-values';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Firstscreen from '../firstscreen';
import Gslect from '../Gslect';
import gOffers from '../gOffers';
import Rslect from '../Rslect';
import Blogin from '../Blogin';
import Glogin from '../Glogin';
import Sanitery from '../Sanitery';
import Lpg from '../Lpg';
import Ac from '../Ac';
import civil from '../Civil';
import About from '../About';

//const auth = getAuth();



const Stack = createNativeStackNavigator();



export default function StackNavigator() {


    return (
        <Stack.Navigator>
            <Stack.Screen name="firstscreen" component={Firstscreen} options={{ headerShown: false }} />
            <Stack.Screen name="Blogin" component={Blogin} options={{ headerShown: false }} />
            <Stack.Screen name="Glogin" component={Glogin} options={{ headerShown: false }} />   
            <Stack.Screen name="bOffers" component={bOffers} options={{ headerShown: false }} />
            <Stack.Screen name="gOffers" component={gOffers} options={{ headerShown: false }} />
            <Stack.Screen name="Gslect" component={Gslect} options={{ headerShown: false }} />
            <Stack.Screen name="Rslect" component={Rslect} options={{ headerShown: false }} />
            <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="UrgentM" component={UrgentMaintenance} options={{ headerShown: false }} />
            <Stack.Screen name="Lpg" component={Lpg} options={{ headerShown: false }} />
            <Stack.Screen name="Bills" component={Bills} />
            <Stack.Screen name="GuestsCar" component={GuestsCar} options={{ headerShown: false }} />
            <Stack.Screen name="Electricity" component={Electricity} options={{ headerShown: false }} />
            <Stack.Screen name="Conditioning" component={Conditioning} options={{ headerShown: false }} />
            <Stack.Screen name="Painter" component={Painter} options={{ headerShown: false }} />
            <Stack.Screen name="ElectricDevices" component={ElectricDevices} options={{ headerShown: false }} />
            <Stack.Screen name="ITdevices" component={ITdevices} options={{ headerShown: false }} />
            <Stack.Screen name="Plumber" component={Plumber} options={{ headerShown: false }} />
            <Stack.Screen name="Ac" component={Ac} options={{ headerShown: false }} />
            <Stack.Screen name="Sanitery" component={Sanitery} options={{ headerShown: false }} />
            <Stack.Screen name="Civil" component={civil} options={{ headerShown: false }} />
            <Stack.Screen name="about" component={About} options={{ headerShown: false }} />
        </Stack.Navigator>

    )
}