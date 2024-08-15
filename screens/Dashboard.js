import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, ImageBackground } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import urgent from '../uregnt.jpg';
import sanitery from '../sanitery.jpg';
import lpg from '../lpg.jpg';
import bills from '../bills.jpg';
import guestcar from '../guestcar.jpg';
import ac from '../ac.jpg';
import civil from '../civil.jpg';
import electric from '../electricity.jpg';
import elecdev from '../electricdevices.jpg';
import pic1 from '../pic1.jpg';
import pic2 from '../pic2.jpg';
import pic3 from '../pic3.jpg';
import pic4 from '../pic4.jpg';
import pic5 from '../pic5.jpg';


const Dashboard = () => {
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
    console.log('Fetching images...');
    const intervalId = setInterval(() => {
        fetchImages();
      }, 5000);
  
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
  }, []);

  /*useFocusEffect(() => {
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
  })*/

    return (
        <View style={styles.container}>
        <ScrollView>
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
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('Sanitery')}>
                            <Image source={sanitery} style={styles.image} />
                            <Text>
                                Sanitery
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('Lpg')}>
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
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('Ac')} >
                            <Image resizeMode='stretch' source={ac} style={styles.image} />
                            <Text>
                                AC
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('Electricity')}>
                            <Image source={electric} style={styles.image} />
                            <Text>
                                Electricity
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('ElectricDevices')}>
                            <Image resizeMode='cover' source={elecdev} style={styles.image} />
                            <Text>
                                Electric Devices
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigateToscreen('Civil')}>
                            <Image source={civil} style={styles.image} />
                            <Text>
                                Civil
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.verticalScrollView} horizontal>
                    <View style={styles.vertical}>
                        <TouchableOpacity style={styles.verticalButton}>
                            <Image source={pic1} style={styles.verticalimage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.verticalButton}>
                            <Image source={pic2} style={styles.verticalimage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.verticalButton}>
                            <Image source={pic3} style={styles.verticalimage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.verticalButton}>
                            <Image source={pic4} style={styles.verticalimage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.verticalButton}>
                            <Image source={pic5} style={styles.verticalimage} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#E4F4F3',
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
    addButton: {
        width: '100%', // Take up the entire width
        height: '25%', // 30% of the screen height
        borderRadius: 20,
        marginBottom: 30, // Adjusted spacing
        borderWidth: 0,
    },
    AddButton: {
        width: '100%',
        height: '80%',
        backgroundColor: '#E4F4F3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 0,
    },
    buttonContainer: {
        flex: 1,
        borderColor: 'black',
        marginTop: '5%',
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
    vertical: {
        flexDirection: 'row',
        marginBottom: '15%', // Adjusted to match your vertical marginBotto
    },
    verticalButton: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 5,
        marginTop: '2%',
        width: 100,
    }, verticalScrollView: {
        marginHorizontal: 10, // Adjusted to match your margin for other elements
        margin: 10,
    },
    verticalimage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    A: {
        backgroundColor: 'gray',
        height: 4,
        width: 20,
        borderRadius: 10,
        margin: 5,
    }

})
export default Dashboard;
