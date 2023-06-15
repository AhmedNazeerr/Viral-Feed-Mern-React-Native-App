import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';

import { useSelector, useDispatch } from 'react-redux'
import { Setemail, Setrole, Setname } from '../../redux/action'


const SelectedDatePage = ({ route }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([
    { label: '1pm', value: '1pm' },
    { label: '2pm', value: '2pm' },
    { label: '3pm', value: '3pm' },
    { label: '4pm', value: '4pm' },
    { label: '5pm', value: '5pm' },
    // Add more options as needed
  ]);
  const navigation = useNavigation();

  var ate = ""

  const { email, role, name } = useSelector(state => state.usereducer);
  const dispatch = useDispatch()

  const { selectedDate } = route.params;
  const [text, setText] = useState("");
  const [ttext, settext] = useState("");
  const [data, setData] = useState([]);
  const [datx, setDatx] = useState([]);


  useEffect(()=>{
    console.log(selectedDate);
    ate = selectedDate.toString();
    var [year, month, daxy] = ate.split("-");
    console.log("Year:", year);
    console.log("Month:", month);
    console.log("Day:", daxy);



    axios.post('http://192.168.18.21:6969/caltimeget', {
      "email": email,
      "date": daxy,
      "month": month,
      "year": year
    }, { headers })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          setDatx(response.data)
        }
        else {
          navigation.navigate('SelectedDatePage')
        }
      })
      .then(data => {
      })
      .catch(error => {
        console.log("Error ========>", error);
      })



    
    // Optional: log the input to console
    // const newData = [...data, { date: selectedDate, text: text }];
    // setData(newData);
    // setText("");
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    // http://localhost
    // http://192.168.18.21:6969/signin
    axios.post('http://192.168.18.21:6969/calget', {
      "email": email,
      "date": daxy,
      "month": month,
      "year": year,
      "todo": text
    }, { headers })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          setData(response.data)
        }
        else {
          navigation.navigate('SelectedDatePage')
        }
      })
      .then(data => {
      })
      .catch(error => {
        console.log("Error ========>", error);
      })
  },[])


  const handleAdd = () => {
    console.log(selectedDate);
    ate = selectedDate.toString();
    var [year, month, daxy] = ate.split("-");
    console.log("Year:", year);
    console.log("Month:", month);
    console.log("Day:", daxy);
    console.log("Added -> ", text);
    // Optional: log the input to console
    // const newData = [...data, { date: selectedDate, text: text }];
    // setData(newData);
    // setText("");
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    // http://localhost
    // http://192.168.18.21:6969/signin
    axios.post('http://192.168.18.21:6969/calpost', {
      "email": email,
      "date": daxy,
      "month": month,
      "year": year,
      "todo": text
    }, { headers })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          navigation.goBack()
        }
        else {
          navigation.navigate('SelectedDatePage')
        }
      })
      .then(data => {
      })
      .catch(error => {
        console.log("Error ========>", error);
      })
  }





  const handleAddteach = () => {
    console.log(selectedDate);
    ate = selectedDate.toString();
    var [year, month, daxy] = ate.split("-");
    console.log("Year:", year);
    console.log("Month:", month);
    console.log("Day:", daxy);
    console.log("Added -> ", text);
    const newdata={
      datas:ttext,
      time:selectedTimeSlot
    }
    console.log(datx)
    setDatx(newdata)
    console.log(selectedDate);
    ate = selectedDate.toString();
    var [year, month, daxy] = ate.split("-");
    console.log("Year:", year);
    console.log("Month:", month);
    console.log("Day:", daxy);
    console.log("Added -> ", text);
    // Optional: log the input to console
    // const newData = [...data, { date: selectedDate, text: text }];
    // setData(newData);
    // setText("");
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    // http://localhost
    // http://192.168.18.21:6969/signin
    axios.post('http://192.168.18.21:6969/calhourres', {
      "studentemail": email,
      "facultyemail": ttext,
      "date": daxy,
      "month": month,
      "year": year,
      "timeslot": selectedTimeSlot
    }, { headers })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          navigation.goBack()
        }
        else {
          navigation.navigate('SelectedDatePage')
        }
      })
      .then(data => {
      })
      .catch(error => {
        console.log("Error ========>", error);
      })
  }










  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dateText}>{`day : ${item.date} month: ${item.month} year: ${item.year}`}</Text>
      <Text style={styles.text}>{item.todo}</Text>
    </View>
  );

  const renderItemx = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dateText}>{`day : ${item.date} month: ${item.month} year: ${item.year}`}</Text>
      <Text style={styles.text}>`student: `{item.studentemail}`  faculty: ` {item.facultyemail}` timeslot: `{item.timeslot}</Text>
    </View>
  );


  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Selected Date:</Text>
      <Text style={styles.selectedDate}>{selectedDate}</Text>

      <TextInput
        style={styles.input}
        onChangeText={(value) => setText(value)}
        value={text}
        placeholder="Add a note"
      />
       
      <Button
        title="Add Note"
        onPress={handleAdd}
        disabled={!text}
        color='#ff5a5f'
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>





      
        {role==="student" ? (
        <View style={styles.container}>
     <TextInput
          style={styles.input}
          onChangeText={(value) => settext(value)}
          value={ttext}
          placeholder="Add teacher email"
        />
        <Picker
          style={styles.dropdown}
          itemStyle={styles.dropdownItem}
          dropdownIconColor="#888"
          selectedValue={selectedTimeSlot}
          onValueChange={(value) => setSelectedTimeSlot(value)}
        >
          {timeSlots.map((slot) => (
            <Picker.Item key={slot.value} label={slot.label} value={slot.value} />
          ))}
        </Picker>

        <Button
          title="Schedule Meeting"
          onPress={handleAddteach}
          disabled={!ttext}
          color='#ff5a5f'
        />

        <FlatList
          data={datx}
          renderItem={renderItemx}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
        </View>
        ) : (
        <View style={styles.container}>
        <FlatList
          data={datx}
          renderItem={renderItemx}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
        </View >
        )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  selectedDate: {
    fontSize: 18,
    marginBottom: 20,
    color: '#888',
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  list: {
    marginTop: 20,
    width: "100%",
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  dropdownItem: {
    fontSize: 16,
    color: '#555',
  },
});

export default SelectedDatePage;