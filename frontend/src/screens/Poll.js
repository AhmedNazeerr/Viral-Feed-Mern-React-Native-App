
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Setemail, Setrole, Setname } from '../../redux/action'

import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Button, IconButton, RadioButton, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PollPage = () => {
  var counter = 0
  var pollid = 0
  var whichid = 0


  const { email, role, name ,poll} = useSelector(state => state.usereducer);
  const dispatch = useDispatch()

  console.log(email)

  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState(null);
  const [polls, setPolls] = useState([
    // {
    //   id: 1, question: 'What is your favorite animal?', options: [
    //     { id: 1, label: 'Dog' },
    //     { id: 2, label: 'Cat' }
    //   ]
    // },
  ]);


  useEffect(() => {
    axios.get('http://192.168.18.21:6969/allpoll')
      .then(responsee => {
        if (responsee.data != "null") {
          axios.post('http://192.168.18.21:6969/getparti', {
            "email": email
          }, { headers })
            .then(response => {
              if (response.data) {
                console.log(responsee.data)
                setPolls(responsee.data)
                console.log(response.data)
                response.data.map((datax) => {
                  setSelectedOptions(prevSelectedOptions => ({
                    ...prevSelectedOptions,
                    [datax.poll]: datax.which
                  }))
                })
              }
            })
            .then(data => {
            })
            .catch(error => {
              console.log("Error ========>", error, "getparti first one in use effect!!");
            })
        }
      })
      .then(data => {
      })
      .catch(error => {
        console.log("Error ========>", error,"allpoll");
      })
    const headers = {
      'Content-Type': 'application/json'
    };

    
  }, [counter])


  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState([]);


  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (pollId, optionId) => {
    // setSelectedOptions(prevSelectedOptions => ({
    //   ...prevSelectedOptions,
    //   [pollId]: optionId
    // }));

    // http://localhost
    // http://192.168.18.21:6969/signin
    const headers = {
      'Content-Type': 'application/json'
    };
    axios.post('http://192.168.18.21:6969/pollset', {
      'email': email,
      'pollid': pollId,
      'id': optionId
    }, { headers })
      .then(response => {
        if (response.data) {
          axios.get('http://192.168.18.21:6969/allpoll')
            .then(responsex => {
              if (responsex.data != "null") {
                console.log(responsex.data)
                axios.post('http://192.168.18.21:6969/getparti', {
                  "email": email
                }, { headers })
                  .then(response => {
                    if (response.data) {
                      console.log(responsex.data)
                      setPolls(responsex.data)
                      response.data.map((datax) => {
                        setSelectedOptions(prevSelectedOptions => ({
                          ...prevSelectedOptions,
                          [datax.poll]: datax.which
                        }))
                      })
                      navigation.replace("MainPage")
                    }
                  })
                  .then(data => {
                  })
                  .catch(error => {
                    navigation.navigate("Poll")
                    console.log("Error ========>", error, "getparti");
                  })
              }
            })
            .then(data => {
            })
            .catch(error => {
              console.log("Error ========>", error, "allpoll");
            })
        }
      })
      .then(data => {
      })
      .catch(error => {
        navigation.navigate("Poll")
        console.log("Error ========>", error, "pollset");
      })
  }


  const handleSubmit = () => {

  };

  const handleAddOption = () => {
    const newOptionLabel = newPollOptions
    setNewPollOptions([])
    if (newOptionLabel) {
      const newOption = {
        id: newPollOptions.length + 1,
        label: newOptionLabel,
      };
      setNewPollOptions([...newPollOptions, newOption]);
    }
  };

  const handleAddPoll = () => {
    if (newPollQuestion && newPollOptions.length > 1) {
      //   const newPoll = {
      //     id: polls.length + 1,
      //     question: newPollQuestion,
      //     options: newPollOptions,
      //   };
      //   setPolls([...polls, newPoll]);


      const headers = {
        'Content-Type': 'application/json'
      };

      // const bod = { email, newPollQuestion, newPollOptions }
      // http://localhost
      // http://192.168.18.21:6969/signin
      axios.post('http://192.168.18.21:6969/pollpost', {
        'email': email,
        'newPollQuestion': newPollQuestion,
        'newPollOptions': newPollOptions
      }, { headers })
        .then(response => {
          if (response.data) {
            console.log(response.data)
            counter++;
            setNewPollQuestion('');
            setNewPollOptions([]);
            navigation.replace("MainPage")
            //  navigation.goBack()
          }
          else {
            console.log("RESPONCE")
            // navigation.navigate('SelectedDatePage')
          }
        })
        .then(data => {
        })
        .catch(error => {
          console.log("Error ========>", error);
        })
    } else {
      alert('Please enter a poll question and at least two options.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.container}> */}
      {polls.map((poll) => (
        <View key={poll._id} style={styles.pollContainer}>
          <Text style={styles.title}>{poll.question}</Text>
          {poll.options.map((opt) => (
            <View style={styles.optionContainer} key={opt._id}>
              <RadioButton
                value={opt._id}
                status={selectedOptions[poll._id] === opt._id ? 'checked' : 'unchecked'}
                onPress={() => handleOptionSelect(poll._id, opt._id)}
              />
              <Text style={styles.optionLabel}>{opt.option}` selected: `{opt.selected} </Text>
            </View>
          ))}
        </View>
      ))}
      
      <View style={styles.newPollContainer}>
        <Text style={styles.newPollLabel}>Add new poll:</Text>
        <TextInput
          style={styles.newPollInput}
          placeholder="Enter poll question"
          value={newPollQuestion}
          onChangeText={(text) => setNewPollQuestion(text)}
        />
        {newPollOptions.map((option) => (
          <View style={styles.optionContainer} key={option.id}>
            <Icon name="drag-vertical" size={24} style={styles.optionIcon} />
            <TextInput
              style={styles.optionInput}
              placeholder="Enter poll option"
              value={option.label}
              onChangeText={(text) => {
                var updatedOption = { ...option, label: text };
                const updatedOptions = newPollOptions.map((o) => o.id === option.id ? updatedOption : o);
                updatedOption=null
                setNewPollOptions(updatedOptions);
              }}
            />
            {/* /* <IconButton
              icon="delete"
              size={24}
              style={styles.optionIcon}
              onPress={() => {
                const updatedOptions = newPollOptions.map((o) => o.id === option.id ? updatedOption : o);

                setNewPollOptions(updatedOptions);
              }}
            /> */ }
          </View>
        ))}
        <Button mode="outlined" onPress={() => handleAddOption()}>
          Add Option
        </Button>
        <Button mode="contained" onPress={() => handleAddPoll()}>
          Add Poll
        </Button>
      </View>
      {/* </View> */}
    </ScrollView>
  );
};
const height=100
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    minHeight: height + height,
  },
  pollContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  optionLabel: {
    marginLeft: 10,
  },
  newPollContainer: {
    marginTop: 20,
  },
  newPollLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newPollInput: {
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
  },
  optionIcon: {
    marginRight: 10,
  },
});

export default PollPage;
