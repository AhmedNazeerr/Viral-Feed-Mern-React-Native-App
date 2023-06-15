import React, { useState ,useEffect} from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Post from './Post';

const data = [
  {
    id: '1',
    username: 'JohnDoe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    postImage: 'https://picsum.photos/500/500',
    caption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    username: 'JaneDoe',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    postImage: 'https://picsum.photos/500/500',
    caption:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

const Search = () => {
  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    axios
      .get("http://192.168.18.21:6969/allp")
      .then(function (response) {
        setPosts(response.data)
        console.log(posts)
      });
  }, [])

  const filteredData = posts.filter((item) =>
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={(value) => setSearchText(value)}
        value={searchText}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Post
            username={item.email}
            avatar={item.image}
            postImage={item.image}
            caption={item.text}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%', // Add width style to make it responsive to full screen
  },
  searchBar: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default Search;
