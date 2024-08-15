import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import iraqB from '../IraqB.png'
import iraqG from '../IraqG.png'
import iraqL from '../IraqL.png'
import iraqO from '../IraqO.png'
import karbala from '../Karbala.png'
import kazim from '../Kazim.png'
import amwaj from '../Amwaj.png'


export default function Rslect( { navigation } ) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={{alignItems: 'center',  height: '34%',   }}>
        <TouchableOpacity style={{
                                      width: '32%',
                                      height: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      }} >
            <Image source={amwaj} style={styles.image} />
          </TouchableOpacity>
          
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Blogin')}>
            <Image source={iraqB} style={styles.image}  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Glogin')}>
            <Image source={iraqG} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image source={iraqL} style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} >
            <Image source={iraqO} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Image resizeMode='stretch' source={kazim} style={{ width: '100%', height: '80%', borderRadius: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Image resizeMode='stretch' source={karbala} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
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
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 0,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
})