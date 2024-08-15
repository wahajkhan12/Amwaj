import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from './AuthContext';


const GuestsCar = ({ navigation }) => {
  const [Visitors, setVisitors] = useState("");
  const { user } = useAuth();
  const [model, setModel] = useState("");
  const [contact, setContact] = useState("");
  const [VN, setVN] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("");
  const [notes, setNotes] = useState("");
  const timeStamp = new Date().toLocaleTimeString();

  const writeData = () => {
    if (!model || !VN || !contact || !Visitors || !ampm) {
      alert("Please Enter Details");
      return;
    }
    const db = getDatabase();
    const dbRef = ref(db, 'guests/' + user + '/' + timeStamp)
    try {
      set(dbRef, {
        visitorName: VN,
        model: model,
        contact: contact,
        Visitors: Visitors,
        AdditionalNotes: notes,
        status: "Pending",
        date: ampm,
      })
      alert("Details Added Successfully");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Guests Car</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>Visitor Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Visitor Name"
          maxLength={150}
          multiline={true}
          value={VN}
          onChangeText={(VN) => setVN(VN)}
        />
        <Text style={styles.descriptionText}>Visitor Phone Number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Visitor Phone Number"
          maxLength={150}
          multiline={true}
          value={contact}
          onChangeText={(contact) => setContact(contact)}
        />
        <Text style={styles.descriptionText}>Car model</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Visitors Car Model"
          maxLength={150}
          multiline={true}
          value={model}
          onChangeText={(model) => setModel(model)}
        />
        <View style={styles.View}>
        <Text style={styles.descriptionText}>Date and Time</Text>
        <Text style={styles.descriptionText2}>Number of Visitors</Text>
        </View>
        <View style={styles.timeContainer}>
          <TextInput
            style={styles.timeInput}
            placeholder="HH"
            placeholderTextColor={'#ffff'}
            keyboardType="numeric"
            maxLength={2}
            value={hour}
            onChangeText={setHour}
          />
          <Text style={{ color: '#ffff', marginHorizontal: 5 }}>:</Text>
          <TextInput
            style={styles.timeInput}
            placeholder="MM"
            placeholderTextColor={'#ffff'}
            keyboardType="numeric"
            maxLength={2}
            value={minute}
            onChangeText={setMinute}
          />
          <TouchableOpacity
            style={styles.ampmButton}
            onPress={() => setAmpm(ampm === 'AM' ? 'PM' : 'AM')}
          >
            <MaterialIcons name={ampm === 'AM' ? 'wb-sunny' : 'brightness-2'} size={24} color="#ffff" />
          </TouchableOpacity>
          <TextInput
          style={styles.textInputVisitors}
          keyboardType='numeric'
          maxLength={150}
          multiline={true}
          value={Visitors}
          onChangeText={(Visitors) => setVisitors(Visitors)}
        />
        </View>
        <Text style={styles.descriptionText}>Additional Details</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Visitors Car Model"
          maxLength={150}
          multiline={true}
          value={notes}
          onChangeText={(notes) => setNotes(notes)}
        />
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={writeData}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
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
  descriptionText2: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  View: {
    color: 'white',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-evenly',
  },
  textInput: {
    // height: '10%',
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
    marginBottom: '20%',
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
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeInput: {
    width: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffff',
    borderRadius: 5,
    textAlign: 'center',
  },
  ampmButton: {
    marginLeft: 10,
  },
  textInputVisitors: {
    width: '20%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: '35%',
  },
});

export default GuestsCar;
