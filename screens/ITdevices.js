import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, set } from 'firebase/database';
import { useAuth } from './AuthContext';
import { getStorage, uploadBytes, getDownloadURL, ref as fileref } from 'firebase/storage';

const ITdevices = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const { user } = useAuth();
  const [task, setTask] = useState("");

  const writeData = () => {
    const db = getDatabase();
    set(ref(db, 'normal/itdevices/' + user), {
      task: task,
      image: imageUri,
  })
  }
  const pickImage = async () => {
    try {
      console.log("handleImagePicker start");
    // Check if permission is granted for camera roll (media library)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted'){
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
      if (status !== 'granted'){
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>IT Devices</Text>
      </View>

      <View style={styles.taskDescriptionContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.taskDescriptionLabel}>Describe a task</Text>
          <Text style={styles.characterLimitLabel}>maximum 150 characters</Text>
        </View>
        <TextInput
          style={styles.taskDescriptionInput}
          placeholder="Enter Your Task Here"
          maxLength={150}
          multiline={true}
          value={task}
          onChangeText={setTask}
        />
        <Text style={styles.relevent}>Please Upload Relevent Picture/Video</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or Take a Picture</Text>

        <TouchableOpacity style={styles.cameraButton} onPress={pickCam}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationButtonsContainer}>
        <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationButton} onPress={writeData}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    
    backgroundColor: 'white',
  },
  headerContainer: {
    marginBottom: 10,
    backgroundColor: '#D9D9D9', 
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    height: '15%',
    borderColor: '#009688',
    borderWidth: 1,
    
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#323232', 
    fontFamily: 'serif', 
  },
  taskDescriptionContainer: {
    marginBottom: 10,
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 10,
    height: '60%',
    borderColor: '#009688',
    borderWidth: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  taskDescriptionLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#323232', 
    fontFamily: 'serif', 
  },
  characterLimitLabel: {
    fontSize: 12,
    color: '#323232',
    fontFamily: 'serif', 
  },
  taskDescriptionInput: {
    textAlignVertical: 'top',
    padding: 10,
    borderRadius: 15,
    minHeight: 120,
    width: '95%',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  uploadButton: {
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    width: '30%',
  },
  orText: {
    fontSize: 15,
    color: '#323232', 
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  cameraButton: {
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    width: '30%',
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  navigationButton: {
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  relevent: {
    fontSize: 15,
    color: '#323232', 
    marginTop: 1,
    textAlign: 'center',
    fontFamily: 'serif',
   
  }

});

export default ITdevices;
