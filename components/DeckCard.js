import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const DeckCard = (props) => {
  const deck = props.item.item;
  const { onDeckClick } = props;

  return (
    <TouchableOpacity onPress={() => onDeckClick(deck)}>
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <View style={styles.deckDetails}>
          <MaterialCommunityIcons name="cards-outline" size={25} color="black" />
          <Text style={styles.deckDetailsText}> {`${deck.questions.length} cards`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 20,
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
  },
  deckDetails: {
    flexDirection: 'row',
  },
  deckDetailsText: {
    fontSize: 20,
    marginLeft: 5,
  },
});

DeckCard.propTypes = {
  item: PropTypes.object.isRequired,
  onDeckClick: PropTypes.func.isRequired,
};

export default DeckCard;
