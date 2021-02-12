import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducers';
import middleware from './store/middleware';

import { printStorage, clearStorage } from './utils/api';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import AddCard from './components/AddCard';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(middleware));

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Button onPress={printStorage} title="Print store" />
          <Button onPress={clearStorage} title="Clear Storage" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={DeckList} />
              <Stack.Screen name="Add" component={AddDeck} />
              <Stack.Screen name="Deck" component={Deck} options={({ route }) => ({ title: route.params.title })} />
              <Stack.Screen name="AddCard" component={AddCard} />
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
