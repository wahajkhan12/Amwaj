import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Alert, Image } from 'react-native';

import { useAuth } from './AuthContext';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { useNavigation, CommonActions } from '@react-navigation/native';
import iraqG from '../IraqG.png';

//Initializing the SDK. 
Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
//Parse.initialize('FZam8e1J8gYcueknLxCJlHRfx9JvS4uHlmX9byes', 'VVL6Auw3fmqXJcv5A0BRdT0kldfl9qcik54i8OWz');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function Glogin() {
  const { setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;

    return await Parse.User.logIn(usernameValue, passwordValue)
      .then(async (loggedInUser) => {
        // logIn returns the corresponding ParseUser object
        Alert.alert(
          'Success!',
          `User ${loggedInUser.get('username')} has successfully signed in!`,
        );
        const user = loggedInUser.get('username');
        console.log(user);
        setUser(user);
        // To verify that this is in fact the current user, currentAsync can be used
        const currentUser = await Parse.User.currentAsync();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Drawer' }],
          })
        );

        console.log(loggedInUser === currentUser);
        return true;
      })
      .catch((error) => {
        // Error can be caused by wrong parameters or lack of Internet connection
        Alert.alert('Error!', error.message);
        return false;
      });
  };


  return (
    <View style={styles.container}>

      <View style={{ alignItems: 'center', width: '90%', height: '50%' }}>
        <Image source={iraqG} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor="#ccc"
        onChangeText={(text) => setUsername(text)}
        value={username}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleLogin(navigation)} >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#192954',
  },
  backgroundImage: {
    flex: 1,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white', // Add a semi-transparent background
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  }
}
