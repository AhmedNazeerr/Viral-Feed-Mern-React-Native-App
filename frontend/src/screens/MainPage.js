
// export default Navbar;
import React, { useEffect } from 'react';
import { View, StyleSheet, Button, LogBox } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Search from './Search';
import Headlines from './Headlines';
import References from './Reference';
import DateTime from './DateTime'; 
import admin from './AdminHome'; 
import NewPostScreen from './AddPost';
import Poll from './Poll';
import AddTextPage from './AddTextPage';
import Meeting from './Meeting';
import { useNavigation, HeaderBackButton } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import { Setemail, Setrole, Setname } from '../../redux/action'


LogBox.ignoreLogs(["Cannot record touch end without a touch start"]);

const Tab = createBottomTabNavigator();

const Navbar = () => {
  counter=0;

  const navigation = useNavigation();
  
  const { email, role, name } = useSelector(state => state.usereducer);
  const dispatch = useDispatch()

  if(email){
    counter++
  }
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Hide the default header back button
    });
  }, [counter]);

  if(!email){
    navigation.replace('Login')
  }



  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if(role==="student"){
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Poll') {
            iconName = focused ? 'new-message' : 'new-message';
            return <Entypo name={iconName} size={size} color={color} />;
          }
          }else if(role==="faculty"){
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          } else if (role === "admin") {
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Poll') {
              iconName = focused ? 'new-message' : 'new-message';
              return <Entypo name={iconName} size={size} color={color} />;
            }
          }
       
        },

        tabBarLabel: '', // hide the text label
        headerShown: false,
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white',
        },
      })}
    >
    {role==="student" &&
      <>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Poll" component={Poll} />
        </>
       }
      {role==="faculty" &&
        <>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
          </>
      }
      {role === "admin" &&
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="Notifications" component={NotificationsScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Poll" component={Poll2} />
        </>
      }
    
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <NewPostScreen />
    </View>
  );
};

const AdminHome = () => {
  return (
    <View style={styles.container}>
      <AdminHome />
    </View>
  );
};



const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Headlines />
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <References/>
    </View>
  );
};

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <DateTime />
    </View>
  );
};

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Search />
    </View>
  );
};

const Poll2 = () => {
  return (
    <View style={styles.container}>
      <Meeting />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navbar;

