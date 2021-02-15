import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const DeckCard = (props) => {
  const deck = props.item.item;
  const { onDeckClick } = props;

  return (
    <TouchableOpacity onPress={() => onDeckClick(deck)}>
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text>{`${deck.questions.length} cards`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 30,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: 25,
  },
});

DeckCard.propTypes = {
  item: PropTypes.object.isRequired,
  onDeckClick: PropTypes.func.isRequired,
};

export default DeckCard;
