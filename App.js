import * as React from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducers';
import middleware from './store/middleware';

import { printStorage, clearStorage } from './utils/api';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(middleware));

const Stack = createStackNavigator();

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator();

const NavTabs = () => {
  return <Tab.Navigator tabBarOptions={{ showIcon: true }}>
    <Tab.Screen
      name="Flashcards"
      component={DeckList}
      options={{
        tabBarLabel: 'Flashcards',
        tabBarIcon: () => <MaterialCommunityIcons name="card-text-outline" size={24} color="black" />,
      }}
    />
    <Tab.Screen
      name="Add"
      options={{
        tabBarIcon: () => <MaterialCommunityIcons name="card-plus-outline" size={24} color="black" />,
      }}
    >{(props) => <AddDeck {...props} store={store} />}</Tab.Screen>
  </Tab.Navigator>;
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Button onPress={printStorage} title="Print store" />
          <Button onPress={clearStorage} title="Clear Storage" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Flashcards" component={NavTabs} options={{ headerTitleAlign: 'center' }} />
              <Stack.Screen name="Deck" component={Deck} options={({ route }) => ({ title: route.params.title })} />
              <Stack.Screen name="AddCard" component={AddCard} />
              <Stack.Screen name="Quiz" component={Quiz} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: 1,
    paddingTop: 30,
    justifyContent: 'flex-start',
  },
});

export default App;
