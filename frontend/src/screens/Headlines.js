import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { View, FlatList, StyleSheet, Text } from 'react-native';

const HeadlinesPage = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    axios
      .get("http://192.168.18.21:6969/allh")
      .then(function (response) {
        if(response.data){
          response.data.map((dat)=>{
            const newData = { id: dat._id, title: dat.headline };
            setData(prevData => [...prevData, newData]);
          })
        }
      });
  },[])

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#ff5a5f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
});

export default HeadlinesPage;
