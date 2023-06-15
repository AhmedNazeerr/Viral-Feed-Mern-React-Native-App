import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Setemail, Setrole, Setname } from '../../redux/action'

const Meeting = () => {
  var counter;

  const navigation = useNavigation();


  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [time, setTime] = useState('');
  const [soc, setsoc] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  var ate = ""

  const { email, role, name } = useSelector(state => state.usereducer);
  const dispatch = useDispatch()
  if(email){
    counter=counter+1
  }

  useEffect(() => {
    axios.get("http://192.168.18.21:6969/revcalget")
      .then((response) => {
        console.log(response.data)
        if (response.data) {
          console.log(response.data)
          // response.data.map((m) => {
          //   const newTimeSlot = {
          //     "manid": m.id,
          //     "id": m.cal._id,
          //     "date": m.cal.date,
          //     "month": m.cal.month,
          //     "year": m.cal.year,
          //     "name": m.cal.name,
          //     "room": m.cal.room,
          //     "time": m.cal.time
          //   };
          //   console.log(newTimeSlot)
          //   setTimeSlots([...timeSlots, newTimeSlot]);
          //   console.log(timeSlots)
          // })
          const newTimeSlots = response.data.map((m) => ({
            "manid": m.id,
            "id": m.cal._id,
            "date": m.cal.date,
            "month": m.cal.month,
            "year": m.cal.year,
            "name": m.cal.name,
            "room": m.cal.room,
            "time": m.cal.time
          }));
          console.log(newTimeSlots)
          setTimeSlots(newTimeSlots);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },[counter])
  const handleDateSelection = (date) => {
    setSelectedDate(date.dateString);
  };
  const reservedd = (id, manid) => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    axios.post('http://192.168.18.21:6969/delrevcal', {
      "id": id,
      "manid": manid
    }, { headers })
      .then(response => {
        if (response.data) {
          navigation.replace("MainPage")
        }
        else {
          navigation.navigate("Meeting")
        }
      })
      .then(data => {
      })
      .catch(error => {
        console.log("Error ========>", error);
      })


  }
  const handleAddTimeSlot = () => {
    console.log(selectedDate);
    ate = selectedDate.toString();
    var [year, month, daxy] = ate.split("-");
    console.log("Year:", year);
    console.log("Month:", month);
    console.log("Day:", daxy);
    // const newTimeSlot = {
    //   date: selectedDate,
    //   time: time,
    //   room: roomNumber,
    // };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    axios.post('http://192.168.18.21:6969/revcalpost', {
      "date": daxy,
      "month": month,
      "year": year,
      "name": soc,
      "room": roomNumber,
      "time": time
    }, { headers })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          setSelectedDate('');
          setTime('');
          setRoomNumber('');
          navigation.replace("MainPage")
        }
        else {
          navigation.replace("Meeting")
        }
      })
      .then(data => {
      })
      .catch(error => {
        console.log("Error ========>", error);
      })


  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.heading}>Room Reservation</Text>
     
      <Calendar
        onDayPress={handleDateSelection}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: '#007bff',
          selectedDayTextColor: '#ffffff',
        }}
      />

      <Text style={styles.label}>Add Time Slot</Text>
      <Text style={styles.selectedDate}>
        Selected Date: {selectedDate}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter time"
        value={time}
        onChangeText={(value) => setTime(value)}
      />


      <TextInput
        style={styles.input}
        placeholder="Enter your Society/Club Name"
        value={soc}
        onChangeText={(value) => setsoc(value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter room number"
        value={roomNumber}
        onChangeText={(value) => setRoomNumber(value)}
      />


      <Button title="Add" onPress={() => handleAddTimeSlot()} disabled={!roomNumber && !soc && !selectedDate} />

      <Text style={styles.subheading}>Time Slots:</Text>
      {timeSlots.map((slot, index) => (
        <View key={index} style={styles.timeSlot}>
          <Text>Date: {slot.date}' '{slot.month}' ' {slot.year}</Text>
          <Text>Time: {slot.time}</Text>
          <Text>Room: {slot.room}</Text>
          <Text>Name: {slot.name}</Text>
          <Text>Req Num : {slot.id}</Text>
          <Text>Req Main : {slot.manid}</Text>
          <Button title="Authenticate" onPress={() => reservedd(slot.id, slot.manid)} />
        </View>
      ))}
    </ScrollView>
  );
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    minWidth: width,
    minHeight: height+height, // Set the minimum height to 100% of the screen height
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedDate: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  timeSlot: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});

export default Meeting;

