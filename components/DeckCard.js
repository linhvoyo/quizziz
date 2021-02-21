import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const DeckCard = (props) => {
  const deck = props.item.item;
  const { onDeckClick, remove } = props;

  return (
    <TouchableOpacity onPress={() => onDeckClick(deck)}>
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <View style={styles.deckDetails}>
          <MaterialCommunityIcons name="cards-outline" size={25} color="black" />
          <Text style={styles.deckDetailsText}> {`${deck.questions.length} cards`}</Text>
        </View>
        <Button
          containerStyle={styles.delete}
          type="clear"
          icon={<AntDesign name="delete" size={15} color="red"/>}
          onPress={() => remove(deck.title)}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 25,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    maxWidth: '65%',
  },
  deckDetails: {
    flexDirection: 'row',
  },
  deckDetailsText: {
    fontSize: 20,
    marginLeft: 5,
  },
  delete: {
    position: 'absolute',
  },
});

DeckCard.propTypes = {
  item: PropTypes.object.isRequired,
  onDeckClick: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default DeckCard;
