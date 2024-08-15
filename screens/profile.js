import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Parse from "parse/react-native.js";
import { useNavigation, CommonActions } from '@react-navigation/native';
import profile from '../images.jpeg'
const Profile = () => {
  const [user, setUser] = useState('');
  const [house, setHouse] = useState('');
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.currentAsync();
    const user = currentUser.get('username');
    console.log(user);
    setUser(user);
    const house = currentUser.get('house');
    console.log(house);
    setHouse(house);
    return currentUser;
  };
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

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.profile}>
          <Image source={profile} style={styles.image} />
        </View>
        <Text style={styles.text}>{user}</Text>
        <TouchableOpacity onPress={() => doUserLogOut()} style={styles.button}>
          <Text style={{ color: 'white', fontSize: 20 }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Personal Details</Text>
      </View>
      <View style={styles.personDetails}>
        <Text style={{ fontSize: 18, marginTop: 10, fontWeight: 'bold', color:'white' }}>User Name: {user}</Text>
        <Text style={{ fontSize: 18, marginTop: 10, fontWeight: 'bold', color:'white' }}>House No: {house}</Text>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    flex: 1,
  },
  imageContainer: {
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    marginBottom: 20
  },
  button: {
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#192954',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  profile: {
    height: '40%',
  },
  personDetails: {
    alignItems: 'flex-start',
    backgroundColor: '#192954',
    marginTop: 20,
    height: '15%',
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginStart: 20
  }
})