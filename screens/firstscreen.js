import { View, Text, TouchableOpacity, ImageBackground, Animated, Modal, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Parse from "parse/react-native.js";
import { useAuth } from './AuthContext';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function Firstscreen({ navigation }) {
    const { setUser } = useAuth();
    const fadeAnim = new Animated.Value(0);
    const [modalVisible, setModalVisible] = useState(false);  // State for modal visibility
    const [showCloseButton, setShowCloseButton] = useState(false);  // State for close button visibility

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000, // Adjust the duration as needed
                useNativeDriver: true,
            }
        ).start();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCloseButton(true);
        }, 5000); // Show the close button after 5 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    const getCurrentUser = async function() {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
            const user = currentUser.get('username');
            console.log(user);
            const house = currentUser.get('house');
            setUser(house);
            console.log(house);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Drawer' }],
                })
            );
        } else {
            setModalVisible(true);
        }
        return currentUser;
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#192954' }}>
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Handle Android back button
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                    {showCloseButton && (
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Entypo name="cross" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.modalText}>Welcome to the app!</Text>
                    </View>
                </View>
            </Modal>
            <View style={{ borderWidth: 0, justifyContent: 'center', alignItems: 'center', height: '10%', marginTop: '90%' }}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
                        Tell us who you are...
                    </Text>
                </Animated.View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '30%' }}>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Rslect')}>
                    <Text>Resident</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Gslect')}>
                    <Text>Guest</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 150,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImage: {
        flex: 1,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalText: {
        fontSize: 20,
        marginTop: 60,
    },
    closeButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16
    }
});
