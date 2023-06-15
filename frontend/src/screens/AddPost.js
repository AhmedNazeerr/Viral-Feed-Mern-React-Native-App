
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import * as Updates from 'expo-updates';

import Post from './Post';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux'
import { Setemail, Setrole, Setname } from '../../redux/action'

const NewPostScreen = () => {
  var counter;
  var temp = false
  const { email, role, name } = useSelector(state => state.usereducer);
  if (role === "admin") {
    temp = true
  }
  const dispatch = useDispatch()

  console.log("this is add main  page  where we show posts", email, role, name)

  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();
  
  if (email) {
    counter = counter + 1
  }

  useEffect(() => {
    axios
      .get("http://192.168.18.21:6969/allp")
      .then(function (response) {
        setPosts(response.data)
        console.log(posts)
      })
  }, [counter])


  const filteredData = posts.filter((item) =>
    item.text.toLowerCase()
  );



  const handleSignOut = async () => {
    // Implement your sign-out logic here
    // http://192.168.18.21:6969/signout
    axios.post('http://192.168.18.21:6969/signout')
      .then(response => {
        console.log("Success ========>", response);
        if (response.data === "Successfully") {
          dispatch(Setemail(null))
          dispatch(Setrole(null))
          dispatch(Setname(null))
           Updates.reloadAsync();
          //navigation.navigate('MainPage')
           navigation.replace('Login')
        }
        else {
          navigation.navigate('MainPage')
        }
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log("Error ========> signout", error);
      })
  };

  const handleNewPost = () => {
    // Navigate to the new post screen
    navigation.replace('NewPostScreenn');
  };

  const handleAddToSociety = () => {
    // Implement your "Add to society" logic here
    console.log("");
    navigation.replace('AddTextPage');
  };

  return (
    // <>
    //   <View style={styles.container2}>
    //     <View style={styles.buttonContainer}>
    //       {temp ? (<> <TouchableOpacity style={styles.button} onPress={handleAddToSociety}>
    //         <Text style={styles.addToSocietyButtonText}>Create Headline</Text>
    //       </TouchableOpacity>
    //         <TouchableOpacity style={styles.button} onPress={handleNewPost}>
    //           <Text style={styles.postButtonText}>New Post</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.button} onPress={handleSignOut}>
    //           <Text style={styles.signOutButtonText}>Sign Out</Text>
    //         </TouchableOpacity></>) : (<><TouchableOpacity style={styles.button} onPress={handleNewPost}>
    //           <Text style={styles.postButtonText}>New Post</Text>
    //         </TouchableOpacity>
    //           <TouchableOpacity style={styles.button} onPress={handleSignOut}>
    //             <Text style={styles.signOutButtonText}>Sign Out</Text>
    //           </TouchableOpacity></>)}

    //     </View>
    //   </View>
    //   <View style={styles.container}>
    //     <View style={styles.containers}>
    //       <FlatList
    //         data={filteredData}
    //         keyExtractor={(item) => item._id}
    //         renderItem={({ item }) => (
    //           <Post
    //             username={item.email}
    //             avatar={item.creatorimage}
    //             postImage={item.image}
    //             caption={item.text}
    //           />
    //         )}
    //       />
    //     </View>

    //   </View>
    // </>


    <>
    <View style={styles.container2}>
      <View style={styles.buttonContainer}>
        {temp ? (
          <>
            <TouchableOpacity style={styles.button} onPress={handleAddToSociety}>
              <Text style={styles.addToSocietyButtonText}>Create Headline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNewPost}>
              <Text style={styles.postButtonText}>New Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleNewPost}>
              <Text style={styles.postButtonText}>New Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.containers}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Post
              username={item.email}
              avatar={item.creatorimage}
              postImage={item.image}
              caption={item.text}
            />
          )}
        />
      </View>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container2: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ff5a5f',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },





  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: '100%'
  },

  addToSocietyButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff5a5f',
    margin: 20,
  },
  addToSocietyButtonText: {
    color: '#fff',
    fontWeight: 'bold',

  },
  input: {
    marginTop: 70,
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  addPostButton: {
    position: 'absolute',
    top: 10,
    left: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff5a5f',
    margin: 20,
  },
  addPostButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    margin: 20,
  },
  imageButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    margin: 20,
  },
  signOutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff5a5f',
    margin: 20,
  },
  signOutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageButtonText: {
    fontSize: 16,
  },
  postButton: {
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff5a5f',
    marginTop: 10,
    marginBottom: 20,
  },
  postButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  postContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  postText: {
    fontSize: 18,
  },
  containers: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%', // Add width style to make it responsive to full screen
  },
});

export default NewPostScreen;