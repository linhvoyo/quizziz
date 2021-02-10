import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { printStorage, clearStorage } from './utils/helpers';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';

const getStore = async () => {

  console.log(await printStorage());
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={printStorage} title="Print store" />
      <Button onPress={clearStorage} title="Clear Storage" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={DeckList} />
          <Stack.Screen name="Add" component={AddDeck} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
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
