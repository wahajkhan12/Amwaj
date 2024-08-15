import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import urgent from '../uregnt.jpg';
import sanitery from '../sanitery.jpg';
import lpg from '../lpg.jpg';
import bills from '../bills.jpg';
import guestcar from '../guestcar.jpg';
import ac from '../ac.jpg';
import civil from '../civil.jpg';
import electric from '../electricity.jpg';
import elecdev from '../electricdevices.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';

const Screen3 = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  const navigateToscreen = (Screen) => {
    navigation.navigate(Screen);
  }

  const startSlideshow = () => {
    const intervalRef = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalRef);
  };

  useEffect(() => {
    if (images.length > 0) {
      startSlideshow();
    }
  }, [images]);

  
useEffect(() => {

// Fetch images from Firebase Storage and update the state
const storage = getStorage();
const imagesRef = ref(storage, 'Ads'); // Replace 'images' with your storage path
const fetchImages = async () => {
  const imageUrls = [];

  const listResult = await listAll(imagesRef);
  for (const item of listResult.items) {
    const imageUrl = await getDownloadURL(item);
    imageUrls.push(imageUrl);
  }

  console.log(imageUrls);
  setImages(imageUrls);
};
fetchImages();
}, []);

  return (


    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
          />
        </View>
        <View style={styles.addButton}>
        <View style={styles.emptySpace}>
                        <ImageBackground
                            source={{ uri: images[currentImageIndex] }}
                            style={styles.imageBackground}
                            resizeMode="cover"
                            borderRadius={10}
                        />

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View style={styles.A}>

                        </View>
                        <View style={styles.A}>

                        </View>
                        <View style={styles.A}>

                        </View>
                        <View style={styles.A}>

                        </View>
                        <View style={styles.A}>

                        </View>
                        <View style={styles.A}>

                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('UrgentM')}>
                            <Image source={urgent} style={styles.image} />
                            <Text>
                                Urgent Jobs
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('Normal')}>
                            <Image source={sanitery} style={styles.image} />
                            <Text>
                                Sanitery
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Image source={lpg} style={styles.image} />
                            <Text>
                                LPG
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('Bills')}>
                            <Image source={bills} resizeMode='stretch' style={styles.image} />
                            <Text>
                                Bills
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('GuestsCar')}>
                            <Image resizeMode='stretch' source={guestcar} style={{ width: '100%', height: '80%', borderRadius: 20 }} />
                            <Text>
                                Guest Car
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} >
                            <Image resizeMode='stretch' source={ac} style={styles.image} />
                            <Text>
                                AC
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} >
                            <Image source={electric} style={styles.image} />
                            <Text>
                                Electricity
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Image resizeMode='cover' source={elecdev} style={styles.image} />
                            <Text>
                                Electric Devices
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} >
                            <Image source={civil} style={styles.image} />
                            <Text>
                                Civil
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

        <View style={{ height: 250 }}>

        </View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  searchContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'black',
    width: '90%', // Take up the entire width
    marginBottom: 40, // Add some space below the search input
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 18,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  addButton: {
    width: '100%', // Take up the entire width
    height: '30%', // 30% of the screen height
    borderRadius: 20,
    marginBottom: 30, // Adjusted spacing
    borderWidth: 0,
},
AddButton: {
    width: '100%',
    height: '85%',
    backgroundColor: '#E4F4F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 0,
},
  buttonContainer: {
    flex: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginBottom: 10,
  },
  button: {
    width: '25%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
  },
  input: {
    borderColor: 'black',
    width: '100%', // Take up the entire width
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    height: '210%',

  },
  A: {
    backgroundColor: 'gray',
    height: 4,
    width: 20,
    borderRadius: 10,
    margin: 5,
    marginTop: 15
},
buttonContainer: {
  flex: 1,
  borderColor: 'black',
  marginBottom: '5%',
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginBottom: 10,
},
button: {
  width: '25%',
  height: 90,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  marginTop: 10,
  marginBottom: 30,
},
image: {
  width: '100%',
  height: '80%',
  borderRadius: 20,
},
emptySpace: {
  height: 250,
  backgroundColor: '#f0f0f0',
  margin: 10,
  borderRadius: 10,
},
imageBackground: {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
},

})

export default Screen3