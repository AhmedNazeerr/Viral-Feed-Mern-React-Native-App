import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Setemail, Setrole, Setname } from '../../redux/action'
import { useNavigation } from '@react-navigation/native';

const References = () => {
var counter;
  const { email, role, name } = useSelector(state => state.usereducer);
  const dispatch = useDispatch()

  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageUri, setNewImageUri] = useState(null);


  if(email){
    counter=counter+1
  }
  useEffect(() => {
    getPermission();  
    axios
      .get("http://192.168.18.21:6969/allresource")
        .then(function (response) {
          response.data.map((dat)=>{
            const newImage = { id: dat._id, title: dat.text, uri: dat.image };
            setImages(prevImages => [...prevImages, newImage]);
            setModalVisible(false);
            setNewImageTitle('');
            setNewImageUri(null);
          })
        });
  }, [counter]);

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  const addImage = () => {
    // handleupdate(imagez)
    const headers = {
      'Content-Type': 'application/json'
    };
    console.log(email, newImageUri, newImageTitle)
    axios.post('http://192.168.18.21:6969/resource', {
      "email": email,
      "text": newImageTitle,
      "image": newImageUri
    }, { headers })
      .then(response => {
        // console.log("Success ========>", response);
        if (response) {
          counter++
          navigation.replace("MainPage")
        }
       
      })
      .catch(error => {
        console.log("Error ========>", error);
      })
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
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
    } catch (error) {
      console.log('Error selecting image:', error);
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
        setNewImageUri(data.url)
      })
      .catch(error => console.log(error))
  }


  const renderImage = ({ item }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => openImageInBrowser(item.uri)}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.imageTitle}>{item.title}</Text>
      </TouchableOpacity >
  );
  const openImageInBrowser = (uri) => {
    Linking.openURL(uri);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Image</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Image</Text>
          <TextInput
            placeholder="Enter title"
            style={styles.input}
            value={newImageTitle}
            onChangeText={(value)=>setNewImageTitle(value)}
          />
          <TouchableOpacity style={styles.attachButton} onPress={handleImagePicker}>
            <Text style={styles.attachButtonText}>Attach Image</Text>
          </TouchableOpacity>
          {newImageUri && <Image source={{ uri: newImageUri }} style={styles.attachedImage} />}
          <TouchableOpacity style={styles.addButton} onPress={addImage} >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
      paddingHorizontal: '5%',
      width:'100%'
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {

    width: 150,
    height: 150,
    borderRadius: 10,
  },
  imageTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  attachButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  attachButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attachedImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default References;
