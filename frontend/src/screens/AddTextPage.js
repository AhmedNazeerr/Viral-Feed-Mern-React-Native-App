import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { Setemail, Setrole, Setname } from '../../redux/action'
const AddTextPage = () => {
    const { email, role, name } = useSelector(state => state.usereducer);
    const dispatch = useDispatch()
    const [nameee, setnameee] = useState('');
    const navigation = useNavigation();

    const handleSubmit = () => {
        // handleupdate(imagez)
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post('http://192.168.18.21:6969/chead', {
            "email": email,
            "text": nameee,
        }, { headers })
            .then(response => {
                if (response.data) {
                    console.log('Submitted nameee:', nameee);
                    // Clear the input field
                    setnameee('');
                    navigation.navigate("MainPage")
                }
            })
            .catch(error => {
                console.log("Error ========>", error);
            })
        // Perform any logic or API call with the submitted nameee
    };

    const handleGoBack = () => {
        navigation.navigate("MainPage")
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={(value)=>setnameee(value)}
                value={nameee}
                placeholder="Enter your name"
            />
            <Button title="Submit" onPress={handleSubmit}
                disabled={!nameee}
             />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: 'blue',
    },
});

export default AddTextPage;
