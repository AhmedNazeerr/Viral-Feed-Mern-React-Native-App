import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { Setemail, Setrole, Setname } from '../../redux/action'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
const LoginForm = ({  route }) => {
  const navigation = useNavigation();
  var counter = 0;
  const [lemail, setEmail] = useState(route.params?.email ?? '');
  const [lpassword, setPassword] = useState(route.params?.password ?? '');


  const { email, role, name } = useSelector(state => state.usereducer);
  const dispatch = useDispatch()



  if (email) {
    counter = counter + 1
  }

  useEffect(() => {
    if (email) {
      navigation.replace('MainPage')
    } else {
      navigation.navigate('Login')
    }

  }, [counter])

  const handleLogin = () => {
    // handle login logic here
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    console.log(lemail, lpassword)
    // http://localhost
    // http://192.168.18.21:6969/signin
    axios.post('http://192.168.18.21:6969/signin', {
      "email": lemail,
      "password": lpassword
    }, { headers })
      .then(response => {
        if (response.data) {
          dispatch(Setemail(response.data.email))
          dispatch(Setrole(response.data.role))
          dispatch(Setname(response.data.name))
          navigation.replace('MainPage')
        }
        else {
          navigation.navigate('Login')
        }
      })
      .then(data => {
        console.log(data)

      })
      .catch(error => {
        navigation.navigate('Login')
        console.log("Error ========>", error);
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={lemail}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={lpassword}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.replace('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
    marginTop: 10,
  },
  linkText: {
    color: '#ff5a5f',
    textDecorationLine: 'underline',
  },
});

export default LoginForm;
