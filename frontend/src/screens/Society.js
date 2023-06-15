import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

const societiesData = [
  { id: 1, name: 'Islamic Society' },
  { id: 2, name: 'Sunnah Society' },
  { id: 3, name: 'Photography Society' },
  { id: 4, name: 'Art Society' },
  { id: 5, name: 'Martial Arts Society' },
];

const AddToSocietyPage = () => {
  const [selectedSocietyIds, setSelectedSocietyIds] = useState([]);
  const [showSelectedSocieties, setShowSelectedSocieties] = useState(false);

  const handleSocietyPress = (id) => {
    if (selectedSocietyIds.includes(id)) {
      setSelectedSocietyIds(selectedSocietyIds.filter((societyId) => societyId !== id));
    } else {
      setSelectedSocietyIds([...selectedSocietyIds, id]);
    }
  };

  const handleJoinSociety = () => {
    if (selectedSocietyIds.length > 0) {
      // handle joining the selected societies
      console.log(`Joined Societies with ids: ${selectedSocietyIds.join(',')}`);
      setShowSelectedSocieties(true);
    } else {
      // show an error message that no society is selected
      console.log('Please select a society to join');
    }
  };

  return (

   // <ImageBackground source={require('../assessts/bg.jpg')} style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Join a Society</Text>
      {societiesData.map((society) => (
        <TouchableOpacity
          key={society.id}
          style={[
            styles.society,
            selectedSocietyIds.includes(society.id) && styles.selectedSociety,
          ]}
          onPress={() => handleSocietyPress(society.id)}
        >
          <Text style={styles.societyName}>{society.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.joinButton} onPress={handleJoinSociety}>
        <Text style={styles.joinButtonText}>Join Selected Societies</Text>
      </TouchableOpacity>
      {showSelectedSocieties && (
        <View style={styles.selectedSocietiesContainer}>
          <Text style={styles.selectedSocietiesTitle}>Selected Societies:</Text>
          {selectedSocietyIds.map((societyId) => {
            const society = societiesData.find((society) => society.id === societyId);
            return (
              <Text key={society.id} style={styles.selectedSocietyName}>
                {society.name}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    ImageBackground: '../assessts/bg.jpg',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  society: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F2CFC2',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
    selectedSociety: {
    backgroundColor: '#E76161',
    borderColor: '#007AFF',
  },
  societyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  joinButton: {
    width:'80%',
    backgroundColor: '#E76161',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    },
    joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    },
    selectedSocietiesContainer: {
    marginTop: 50,
    backgroundColor: '#ff5a5f',
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    },
    selectedSocietiesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    },
    selectedSocietyName: {
    fontSize: 14,
    color: '#333',
    fontSize: 18,
    margin: 5,
    },
    });
    
    export default AddToSocietyPage;
    
    
    
    
    
    
