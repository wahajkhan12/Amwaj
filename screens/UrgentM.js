import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, set } from 'firebase/database';
import { useAuth } from './AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { getStorage, listAll, uploadBytes, getDownloadURL, ref as fileref } from 'firebase/storage';

const UrgentM = ({ navigation }) => {
  const [imageUri, setImageUri] = useState();
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [task, setTask] = useState('');

  const writeData = () => {
    if (!task) {
      alert('Please enter a task.');
      return;
    }
    try {
      const db = getDatabase();
      set(ref(db, 'urgent/' + user), {
        task: task,
        image: imageUri,
        status: 'Pending',
      })
    } catch (error) {
      console.log(error);
    }
    finally {
      alert('Job posted successfully!');
      navigation.navigate('Drawer');
    }
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
    const imagesRef = fileref(storage, 'Ads'); // Replace 'images' with your storage path
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

  const pickImage = async () => {
    try {
      console.log("handleImagePicker start");
      // Check if permission is granted for camera roll (media library)
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied to access media library.');
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uploadURL = await handleUploadButtonPress(result.assets[0].uri);
        setImageUri(uploadURL);
        console.log(uploadURL);
      } else {
        setImageUri(null);
      }
    } catch (error) {
      console.log("handleImagePicker error:", error);
      alert(error);
    }
    console.log("handleImagePicker end");
  };

  const pickCam = async () => {
    try {
      console.log("handleCameraButtonPress start");
      // Check if permission is granted for camera roll (media library)
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied to access camera.');
        return;
      }
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const uploadURL = await handleUploadButtonPress(result.assets[0].uri);
        setImageUri(uploadURL);
        console.log(uploadURL);
      } else {
        setImageUri(null);
      }

    }
    catch (error) {
      console.log("handleCameraButtonPress error:", error);
      alert(error);
    }
    console.log("handleCameraButtonPress end");
  };

  const handleUploadButtonPress = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    try {
      const storageRef = fileref(getStorage(), `images/image-${Date.now()}.jpeg`);
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      alert('Image uploaded successfully press Next button to launch the complaint');
      return await getDownloadURL(storageRef);

    } catch (error) {
      console.log(error);
      alert('Error : ');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.icon}>
        <MaterialIcons name="warning" size={70} color="black" />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Urgent Maintenance</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>Describe a Task (minimum 150 characters):</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Your Task Here"
          maxLength={150}
          multiline={true}
          value={task}
          onChangeText={(task) => setTask(task)}
        />
        <Text style={styles.uploadText}>Please upload Relevant Picture/Video</Text>

        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or Take a Picture</Text>

        <TouchableOpacity onPress={pickCam} style={styles.button}>
          <Text style={{ color: '#fff', fontSize: 14, }}>Take a Picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={writeData}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addButton}>
      <View style={styles.emptySpace}>
          {/*
          <ImageBackground
            source={{ uri: images[currentImageIndex] }}
            style={styles.imageBackground}
            resizeMode="cover"
            borderRadius={10}
          />
        */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#192954',
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  icon: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    backgroundColor: '#192954',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
    width: '100%',
    color: 'white',
  },
  textInput: {
    height: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    width: '100%',
  },
  uploadText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#192954',
    padding: 12,
    width: '40%',
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  orText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#192954',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    width: '100%', // Take up the entire width
    height: '10%', // 30% of the screen height
    borderRadius: 20,
    marginBottom: 30, // Adjusted spacing
    borderWidth: 0,
  },
  emptySpace: {
    height: '50%',
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UrgentM;
