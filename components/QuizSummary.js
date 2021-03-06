import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import { clearScheduledNotifications, scheduleNotificationAsync } from '../utils/helpers';

export default function QuizSummary(props) {
  const { questions, answers, onRestart } = props;

  const getStatus = (answrs) => ({
    correct: answrs.reduce((a, c) => c ? a + 1 : a, 0),
    incorrect: answrs.reduce((a, c) => c === false ? a + 1 : a, 0),
    unanswered: answrs.reduce((a, c) => c === null ? a + 1 : a, 0),
  });

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

  const stats = getStatus(answers);

  useEffect(() => {
    const TimeNotificatonTrigger = {
      seconds: 60 * 60 * 24,
      repeats: true,
    };
    clearScheduledNotifications()
      .then(async () => scheduleNotificationAsync(TimeNotificatonTrigger));
  });

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
          <Button title="Restart Quiz" onPress={onRestart} />
        </View>
      </View>
      <FlatList
        style={styles.list}
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
    marginRight: 10,
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
  list: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
});

QuizSummary.propTypes = {
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  onRestart: PropTypes.func.isRequired,
};
