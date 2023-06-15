import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Post = ({ username, avatar, postImage, caption }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image style={styles.postImage} source={{ uri: postImage }} />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  caption: {
    margin: 10,
  },
});

export default Post;
