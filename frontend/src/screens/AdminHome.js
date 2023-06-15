import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';

const Navbar = ({ navigation }) => {
  const name = 'John Doe';
  const description = 'Software Developer';
  const image = 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp';
  const bigImage = 'https://mdbcdn.b-cdn.net/img/new/slides/041.jpg';

  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePost = () => {
    console.log('Posting:', postText);
    setPosts([...posts, postText]);
    setPostText('');
  };

  return (
    <ImageBackground
      source={require('../assessts/bg1.jpg')}
      style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.userDetails}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>PRO</Text>
            </View>
          </View>
        </View>
        <Image source={{ uri: bigImage }} style={styles.bigImage} />
      </View>
      <View style={styles.postsContainer}>
        <Text style={styles.postsText}>Posts</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type here to add a new post"
            placeholderTextColor="#aaa"
            onChangeText={(text) => setPostText(text)}
            value={postText}
          />
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.postsScrollView}>
          {posts.map((post, index) => (
            <Text key={index} style={styles.postText}>
              {post}
            </Text>
          ))}
        </ScrollView>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('DateTime')}>
          <Text style={styles.navLink}>Meeting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Headlines')}>
          <Text style={styles.navLink}>Headlines</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AddImage')}>
          <Text style={styles.navLink}>BookDisplay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('SearchPage')}>
          <Text style={styles.navLink}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AddToSocietyPage')}>
          <Text style={styles.navLink}>Join Society</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:  1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius:75,
},
name: {
fontSize: 24,
fontWeight: 'bold',
},
descriptionContainer: {
flexDirection: 'row',
alignItems: 'center',
marginTop: 5,
},
description: {
fontSize: 16,
marginRight: 10,
},
badgeContainer: {
backgroundColor: '#03A9F4',
borderRadius: 10,
paddingHorizontal: 5,
},
badge: {
color: '#fff',
fontWeight: 'bold',
},
bigImage: {
width: '100%',
height: 200,
marginTop: 20,
},
postsContainer: {
  marginTop: 5,
backgroundColor: '#26466a',
padding: 10,
width: '100%',
borderBottomLeftRadius: 10,
borderBottomRightRadius: 10,
},
postsText: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 10,
},
textInputContainer: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: '#fff',
borderRadius: 10,
padding: 5,
},
textInput: {
flex: 1,
fontSize: 16,
marginLeft: 10,
},
postButton: {
backgroundColor: '#D3D3D3',
borderRadius: 10,
padding: 10,
marginLeft: 10,
},
postButtonText: {
color: '#fff',
fontWeight: 'bold',
},
navbar: {
flexDirection: 'row',
backgroundColor: '#26466a',
padding: 10,
width: '100%',
justifyContent: 'space-around',
borderTopLeftRadius: 20,
borderTopRightRadius: 20,
position: 'absolute',
bottom: 0,
},
navItem: {
paddingHorizontal: 10,
},
navLink: {
color: '#fff',
fontSize: 16,
},
});

export default Navbar;
