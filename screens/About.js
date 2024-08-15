import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import iraqB from '../IraqB.png'
import iraqG from '../IraqG.png'
import iraqL from '../IraqL.png'
import iraqO from '../IraqO.png'
import karbala from '../Karbala.png'
import kazim from '../Kazim.png'
import amwaj from '../Amwaj.png'


export default function Gslect( { navigation } ) {
  return (
    <View style={styles.container}>
        <TouchableOpacity  style={styles.button}>
            <Text> About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text> Available areas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text> Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('gOffers')} style={styles.button}>
            <Text> Offers</Text>
        </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#192954',
    alignItems: 'center',
  },
  buttonContainer: {
    borderColor: 'black',
    width: '95%',
    height: '70%',
    
  },
  row: {
    flexDirection: 'row',
    height: '33%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
  },
  button: {
    width: '30%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 0,
    backgroundColor: 'white',
    borderColor: 'white',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
})