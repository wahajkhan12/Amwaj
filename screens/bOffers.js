import { View, Text, ImageBackground } from 'react-native'
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import React, { useState, useEffect } from 'react'

export default function Guestscreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <View style={styles.addButton}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'gray' }}>
            Boulevard
          </Text>
        </View>
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
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '6%', marginBottom: '40%', width: '90%', borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'gray' }}>
          Rental
        </Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '6%', marginBottom: '20%', width: '90%', borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'gray' }}>
          Purchase
        </Text>
      </View>
    </View>
  )
};

const styles = {
  addButton: {
    width: '100%', // Take up the entire width
    height: '40%', // 30% of the screen height
    borderRadius: 20,
    margin: '10%', // Adjusted spacing
    borderWidth: 0,
  },
  A: {
    backgroundColor: 'gray',
    height: 4,
    width: 20,
    borderRadius: 10,
    margin: 5,
  },
  emptySpace: {
    height: 240,
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

}