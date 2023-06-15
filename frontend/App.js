
import { Provider } from 'react-redux'
import { store } from './redux/store'
// In App.js in a new project
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/screens/SignUp';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import DateTime from './src/screens/DateTime';
import Headlines from './src/screens/Headlines';
import Meeting from './src/screens/Meeting';
import MainPage from './src/screens/MainPage';
import BookDisplay from './src/screens/Reference';
import SplashScreen from './src/screens/SplashScreen';
import Search from './src/screens/Search';
import AddToSocietyPage from './src/screens/Society';
import Adminbar from './src/screens/AdminHome';
import AddImage from './src/screens/AddImage';
import NewPostScreen from './src/screens/AddPost';
import Poll from './src/screens/Poll';
import Getpoll from './src/screens/Getpoll';
import NewPostScreenn from './src/screens/AddPostt';
import SelectedDatePage from './src/screens/SelectedDate';
import AddTextPage from './src/screens/AddTextPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Adminbar" component={Adminbar} />
          <Stack.Screen name="DateTime" component={DateTime} />
          <Stack.Screen name="AddImage" component={AddImage} />
          <Stack.Screen name="Headlines" component={Headlines} />
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="AddTextPage" component={AddTextPage} />
          <Stack.Screen name="NewPostScreenn" component={NewPostScreenn} />
          <Stack.Screen name="BookDisplay" component={BookDisplay} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Poll" component={Poll} />
          <Stack.Screen name="Getpoll" component={Getpoll} />
          <Stack.Screen name="Meeting" component={Meeting} />
          <Stack.Screen name="SelectedDatePage" component={SelectedDatePage} />
          <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
          <Stack.Screen name="AddToSocietyPage" component={AddToSocietyPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;


// Api 

// import { View, Text, StyleSheet} from 'react-native'
// import React, {useEffect, useState} from 'react'
// import {albumPhotosUrl} from './src/utils/url';
// import axios, { Axios } from 'axios';

// export default function App() {

//   const [postData, setpostData] = useState([]);

//   useEffect(() => {
//     fetchApiData
//   },[])

//   const fetchApiData = async () => {
//     try {

//       const response = await Axios.get(albumPhotosUrl);
//       setpostData(response.data);

//     } catch (error) {

//     }
//   }

//   return (
//     <View style = {styles.container}>
//       <View>

//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container:{

//   }
// })




// array to list example 

// import { View, Text, StyleSheet, ScrollView, FlatList , TouchableOpacity} from 'react-native'
// import React, {useState} from 'react'

// export default function App() {

//   const [data, setData] = useState([
//     {id: 1, name : "MAKK"},
//     {id: 2, name : "MAKK"},
//     {id: 3, name : "MAKK"},
//     {id: 4, name : "MAKK"},
//     {id: 5, name : "MAKK"},
//     {id: 6, name : "MAKK"},
//   ]);

//   const handleClick = oldRoll => {
//     setData(prevData => {
//       return prevData.filter(tempData => {
//         if (tempData.id != oldRoll)
//         {
//           return tempData;
//         }
//       })
//     })
//   }

//   return (
//     <View style= {styles.container}>
//       <FlatList
//       data={data}
//       renderItem={({item}) => {
//         return (
//           <TouchableOpacity onPress={() => handleClick(item.id)}>
//         <Text style={styles.datacus}> {item.name}</Text>
//         </TouchableOpacity>
//         )
//       }}
//       />

//       {/* <ScrollView>
//        {data.map((listdata, index) =>{
//           return (
//             <View key={listdata.id}>
//               <Text style={styles.datacus}> {listdata.name}</Text>
//               </View>
//           )
//         })}
// </ScrollView> */}
//     </View>
//   )
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//   },
//   datacus: {
//     fontSize: 100
//   }
// });





// counter example 


{/* <View style={customStyle.mainContainer}>
<TouchableOpacity onPress={incCount} activeOpacity={0.8}>

  <Text style={{ fontSize: 36 }}>+ </Text>       
</TouchableOpacity>


<Text>{count}</Text>

<TouchableOpacity onPress={() => decCount()} activeOpacity={0.8}>

<Text style={{ fontSize: 36 }}> - </Text> 
 
</TouchableOpacity>
</View> */}