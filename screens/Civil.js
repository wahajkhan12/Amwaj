import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useAuth } from './AuthContext';
import { getStorage, uploadBytes, listAll, getDownloadURL, ref as fileref } from 'firebase/storage';


const Civil = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const { user } = useAuth();
  const [task, setTask] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedPackageFee, setSelectedPackageFee] = useState("");
  const [packages, setPackages] = useState([])
  const [userInput, setUserInput] = useState("");
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchPackagesAndFees = async () => {
    const db = getDatabase();
    const packagesRef = ref(db, 'services/civil'); // Change 'Electricity' to the appropriate department
    try {
      const snapshot = await get(packagesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Extract package data and fee from the 'data' object
        const packageData = Object.keys(data).map((packageKey) => ({
          name: packageKey,
          fee: data[packageKey].fee, // Replace 'fee' with the actual field name for fee
          // You can add more fields here if needed
        }));
        setPackages(packageData);
      } else {
        // Handle the case where no packages are found
        console.log('No packages found for this department.');
      }
    } catch (error) {
      console.error('Error fetching package data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPackagesAndFees();
    }, []) // The empty dependency array ensures this effect runs only once on component mount
  );

  const writeData = async () => {
    if (!userInput) {
      alert('Please enter a task.');
      return;
    }
    const db = getDatabase();
    const dbRef = ref(db, 'normal/' + user + '/civil');
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.status === 'closed') {
          await set(dbRef, {
            task: userInput,
            image: imageUri,
            fee: selectedPackageFee,
            status: 'pending',
          });
          alert('Job posted successfully!');
          setImageUri(null);
          navigation.navigate('Drawer');
          return;
        }
        else {
          alert('You have an active job. Please complete it first.');
          return;
        }
      } else {
        await set(dbRef, {
          task: userInput,
          image: imageUri,
          afee: selectedPackageFee,
          status: 'Pending',
        });
        alert('Job posted successfully!');
        setImageUri(null);
        navigation.navigate('Drawer');
        return;
      }
    }
    catch (error) {
      console.error('Error writing data:', error);
      alert('Error writing data:', error);
    }
  }
  const handlePickerValueChange = (itemValue, itemIndex) => {
    const selectedPackage = packages.find((packageItem) => packageItem.name === itemValue);
    if (selectedPackage) {
      setSelectedPackageFee(selectedPackage.fee);
    } else {
      setSelectedPackageFee(null);
    }
    setSelectedValue(itemValue);
  };
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


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handlePickerValueChange}
          style={styles.picker}
        >
          <Picker.Item label="Select Package" value="" style={styles.pickertext} />
          {packages.map((packageItem) => (
            <Picker.Item
              key={packageItem.name}
              label={packageItem.name}
              value={packageItem.name}
            />
          ))}
          <Picker.Item label="Other" value="Other" style={styles.pickertext} />
        </Picker>
        <View>
          {selectedPackageFee !== null && (
            <Text style={styles.pickertext}>Fee: {selectedPackageFee}</Text>
          )}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>Describe a Task (minimum 150 characters):</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Your Task Here"
          maxLength={150}
          multiline={true}
          value={userInput}
          onChangeText={(userInput) => setUserInput(userInput)}
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
    marginTop: 10,
    borderWidth: 1,
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
    height: '25%', // 30% of the screen height
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
  picker: {
    width: '100%',
    color: 'gray',
  },
  pickertext: {
    color: 'gray',
    padding: 15,
  }
});

export default Civil;
