import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getStorage, clearStorage } from './utils/helpers';

import DeckList from './components/DeckList';

const getStore = async () => {

  console.log(await getStorage());
};

export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={getStorage} title="Print store" />
      <Button onPress={clearStorage} title="Clear Storage" />
      <Text>Universal React with Expo</Text>
      <DeckList></DeckList>
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
