import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Setemail, Setrole, Setname,Setpoll } from '../../redux/action'
const Getpoll = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const [inputValue, setInputValue] = useState('');
    const animatedInput = useRef(new Animated.Value(0)).current;
    const animatedButton = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        Animated.parallel([
            Animated.timing(animatedInput, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(animatedButton, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleBlur = () => {
        Animated.parallel([
            Animated.timing(animatedInput, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(animatedButton, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const inputStyles = {
        transform: [
            {
                translateY: animatedInput.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50],
                }),
            },
        ],
    };

    const buttonStyles = {
        opacity: animatedButton,
    };

    const handleSubmit = () => {
        // Perform actions with the submitted value
        if(inputValue){
            dispatch(Setpoll(inputValue))
            setInputValue("")
            navigation.navigate("Poll")
        }
        else{
            navigation.navigate("Getpoll")
        }

    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.inputContainer, inputStyles]}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setInputValue(text)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={inputValue}
                    placeholder="Enter a value"
                />
            </Animated.View>
            <Animated.View style={[styles.buttonContainer, buttonStyles]}>
                <Button title="Submit" onPress={handleSubmit} disabled={!inputValue} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    buttonContainer: {
        width: 200,
    },
});

export default Getpoll;
