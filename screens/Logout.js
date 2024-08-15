import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
//import { getAuth, signOut } from 'firebase/auth'
import { useNavigation, CommonActions } from '@react-navigation/native';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';

const Logout = () => {
  const navigation = useNavigation();
 // const auth = getAuth();

 const doUserLogOut = async function () {
  try {
    // Log the user out of Back4App using Parse
    await Parse.User.logOut();

    // To verify that the user is logged out, check Parse's currentUser
    const currentUser = await Parse.User.currentAsync();
    if (currentUser === null) {
      Alert.alert('Success!', 'User is logged out.');
      console.log('User is logged out.');
      // Use the reset method to clear the navigation stack and navigate to the login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Rslect' }],
        })
      );
    } else {
      Alert.alert('Error!', 'Failed to log out.');
    }
  } catch (error) {
    Alert.alert('Error!', error.message);
    console.error(error);
  }
};


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <TouchableOpacity onPress={() => doUserLogOut()}  style={styles.button }>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = {
  button : {
  height: 50,
  width: 200,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'lightblue',
  borderRadius: 10
  }
}
export default Logout