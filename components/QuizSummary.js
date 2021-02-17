import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

import { AntDesign } from '@expo/vector-icons';

export default function QuizSummary(props) {
  const { stats, questions, answers } = props;

  const renderQuestion = ({ item, index }) => (
    <ListItem bottomDivider>
      { answers[index]
        ? <AntDesign name="checkcircleo" size={24} color="green" />
        : <AntDesign name="closecircleo" size={24} color="red" />}
      <ListItem.Content>
        <ListItem.Subtitle>Q: {item.question}/</ListItem.Subtitle>
        <ListItem.Subtitle>A: {item.answer}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.img} source={require('../assets/undraw_statistic_chart_38b6.png')} />
        <View style={styles.rightContainer}>
          <View style={styles.stats}>
            <View style={styles.statsColumn}>
              <Text style={styles.statsText}>Number correct:</Text>
              <Text style={styles.statsText}>Number incorrect:</Text>
              <Text style={styles.statsText}>Total questions:</Text>
            </View>
            <View style={styles.statsColumn}>
              <Text style={styles.statsText}>{stats.correct}</Text>
              <Text style={styles.statsText}>{stats.incorrect}</Text>
              <Text style={styles.statsText}>{stats.incorrect + stats.correct}</Text>
            </View>
          </View>
          <Button title="Restart Quiz" />
        </View>
      </View>
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderQuestion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  img: {
    width: 200,
    height: 150,
    resizeMode: 'stretch',
  },
  rightContainer: {
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsColumn: {
    margin: 10,
  },
  statsText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  question: {
    borderColor: 'red',
    borderWidth: 1,
    flexDirection: 'row',
  },
});

QuizSummary.propTypes = {
  stats: PropTypes.shape({
    correct: PropTypes.number.isRequired,
    incorrect: PropTypes.number.isRequired,
  }),
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
};
