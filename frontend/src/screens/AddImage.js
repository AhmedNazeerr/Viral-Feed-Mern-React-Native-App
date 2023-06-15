import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddImage = () => {
  const [pictures, setPictures] = useState([
    { uri: 'https://example.com/book-image.jpg', text: 'Stephen M.R COVEY' }
  ]);
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');

  const handleAddPicture = () => {
    const newPicture = { uri: imageUrl, text };
    setPictures([...pictures, newPicture]);
    setImageUrl('');
    setText('');
  };

  const handleDeletePicture = (index) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  return (
    <View style={styles.container}>
      {pictures.map((picture, index) => (
        <View key={index} style={styles.pictureContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePicture(index)}>
            <Icon name="trash-outline" size={25} color="#FFF" />
          </TouchableOpacity>
          <Image source={{ uri: picture.uri }} style={styles.bookImage} />
          <TextInput
            style={styles.authorName}
            value={picture.text}
            onChangeText={(newText) => {
              const newPictures = [...pictures];
              newPictures[index].text = newText;
              setPictures(newPictures);
            }}
          />
        </View>
      ))}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        <TextInput
          style={styles.input}
          placeholder="Text"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPicture}>
          <Text style={styles.addButtonText}>Add Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  pictureContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  bookImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginRight: 10,
  },
  authorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AddImage;
