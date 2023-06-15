import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, {useState} from 'react'

export default function HomeScreen({navigation}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        navigation.navigate("Profile", {
            userName: name,
            userEmail: email,
            userPassword: password
        });
    }
    // function handleNavigation(screenName)
    // {
    //     navigation.navigate(screenName);
    // }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <View>
                <Text style = {{textAlign: 'center', marginBottom: 20}}> 
                    Email
                </Text>
                <TextInput style = {styles.input} placeholder='Enter Your Name' value = {name} onChangeText={(text) => setName(text)} /> 
                <TextInput style = {styles.input} placeholder='Enter Your Email' value = {email} onChangeText={(text) => setEmail(text)}/> 
                <TextInput style = {styles.input} placeholder='Enter Your Password' value = {password} onChangeText={(text) => setPassword(text)}/> 

                <TouchableOpacity onPress={() => handleSubmit()} style = {styles.submitButton}>
                    <Text style={{textAlign: 'center'}}> 
                        Submit 
                    </Text>
                </TouchableOpacity>
            </View>
          {/* <View>
            <TouchableOpacity onPress={() => handleNavigation("Screen1")} style = {{backgroundColor: 'yellow', padding: 30, marginBottom: 20}}>
                <Text> Screen 1 </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation("Screen2")} style = {{backgroundColor: 'yellow', padding: 30, marginBottom: 20}}>
                <Text> Screen 2 </Text>
            </TouchableOpacity>
          </View> */}

        </View>
      );
}

const {width} = Dimensions.get("screen");

const styles = StyleSheet.create({
    input: {
        width: width - 1100,
        borderWidth: 2,
        marginTop: 20,
        padding: 10,
        borderRadius: 30,
    },

    submitButton: {
        width: width - 1100,
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 30,
        marginTop: 20,
    }
})