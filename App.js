import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MovieScreen } from './Tabs/MovieScreen';
import { SearchScreen } from './Tabs/SearchScreen';
import { TvShows } from './Tabs/TvShows';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './DetailScreen';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          style: { marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
        },
      }}
    >
      <Tab.Screen name="Movies" component={MovieScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="TV Shows" component={TvShows} />
    </Tab.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  function CustomHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Movies App</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="skyblue" />
        <CustomHeader />
        <Stack.Navigator>
          <Stack.Screen name="Back to List" component={TabScreens} options={{ headerShown: false }} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: 'skyblue',
    paddingVertical: 25,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fffc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
