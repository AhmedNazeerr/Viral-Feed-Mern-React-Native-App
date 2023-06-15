//     export default DateTime;
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';


const CalendarPage = () => {
  console.log("Calendar  PAGE NAME IS DATETIME")
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const navigation = useNavigation();

  const handleSelect = () => {
    console.log(selectedDate);
    navigation.navigate('SelectedDatePage', { selectedDate });
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={handleDayPress} markedDates={{ [selectedDate]: { selected: true } }} />
      <Button mode="contained" style={styles.BCT} disabled={!selectedDate} onPress={handleSelect}>
        Select
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    height: '100%'
  },
  BCT:{
    marginTop:20
  },
});

export default CalendarPage;
