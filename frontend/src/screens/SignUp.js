import React, { useState, useEffect } from 'react';

import { Platform } from 'react-native'

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useIsFocused } from '@react-navigation/native'

import axios from 'axios'


import { useSelector, useDispatch } from 'react-redux'


import { RadioButton } from 'react-native-paper';
console.ignoredYellowBox = ['Cannot record touch end without a touch start'];

export default function SignupForm({ navigation }) {
  var counter = 0

  const focus = useIsFocused()

  const { email, role, name } = useSelector(state => state.usereducer);
  const dispatch = useDispatch()

  const [lname, setName] = useState('');
  const [lemail, setEmail] = useState('');
  const [lpassword, setPassword] = useState('');
  const [image, setImage] = useState();
  const [userType, setUserType] = useState("student");



  console.log(email)
  if (email) {
    counter = counter + 1;
  }


  useEffect(() => {
    if (focus && email) { // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
      navigation.replace('MainPage')
    }
    else {
      navigation.navigate('Signup')
    }


    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [counter]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      let base64Img = `data:image;base64,${result.assets[0].base64}`;
      // const uri = result.assets[0].uri
      // const type = result.assets[0].type
      // const name = result.assets[0].assetId
      // const source = { uri, type, name }
      console.log(base64Img)
      handleupdate(base64Img)
    }
  };


  const handleupdate = async (photo) => {
    let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/derwz03wm/image/upload';
    let datas = {
      "file": photo,
      "upload_preset": "student",
    }
    await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: JSON.stringify(datas),
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(async r => {
        let data = await r.json()
        console.log(data.url)
        setImage(data.url);
      })
      .catch(error => console.log(error))
  }


  const handleSignup = () => {

    // handleupdate(imagez)
    const headers = {
      'Content-Type': 'application/json'
    };
    console.log(lname, lemail, lpassword, image)
    axios.post('http://192.168.18.21:6969/signup', {
      "email": lemail,
      "name": lname,
      "password": lpassword,
      "role": userType,
      "image": image
    }, { headers })
      .then(response => {
        // console.log("Success ========>", response);
        if (response.data === "Already Registered") {
          navigation.navigate('Login')
        }
        else {
          navigation.replace('Signup')
        }

      })
      .catch(error => {
        console.log("Error ========>", error);
      })
  }



  const GoLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={lname}
        onChangeText={(text) => setName(text)}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={lemail}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={lpassword}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <View style={styles.radioGroup}>
        <Text style={styles.radioLabel}>Sign up as:</Text>
        <View style={styles.radioButtons}>
          <RadioButton
            value="student"
            status={userType === "student" ? 'checked' : 'unchecked'}
            onPress={() =>
              setUserType("student")
            }
          />
          <Text>student</Text>
          <RadioButton
            value="faculty"
            status={userType === "faculty" ? 'checked' : 'unchecked'}
            onPress={() => setUserType("faculty")}
          />
          <Text>faculty</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={GoLogin}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  radioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff5a5f',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#333',
  },
  imageButton: {
    marginTop: 10,
    backgroundColor: '#ff5a5f',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
});
