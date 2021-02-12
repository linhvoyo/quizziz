import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const DeckCard = (props) => {
  const deck = props.item.item;
  const { onDeckClick } = props;

  return (
    <TouchableOpacity onPress={() => onDeckClick(deck)}>
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{`${deck.questions.length} cards`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
  },
});

DeckCard.propTypes = {
  item: PropTypes.object.isRequired,
  onDeckClick: PropTypes.func.isRequired,
};

export default DeckCard;
