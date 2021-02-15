import React from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuizCard, { QuizSummary } from './QuizCard';

class Quiz extends React.Component {
  state = {
    current: 0,
    questions: [],
    answers: [],
    isFlipped: false,
    animate: new Animated.Value(0),
  };

  onMount = () => {
    const { questions, answers } = this.props.route.params;
    this.setState({ questions: [...questions], answers: [...answers] });
  };

  componentDidMount() {
    return this.onMount();
  }

  flipHandler = () => {
    const { animate, isFlipped } = this.state;
    Animated.timing(animate, {
      duration: 300,
      toValue: !isFlipped ? 180 : 0,
      useNativeDriver: true,
    }).start(
      this.setState((prev) => ({ isFlipped: !prev.isFlipped }))
    );
  }

  getStatus = (answers) => {
    return {
      correct: answers.reduce((a, c) => c ? a + 1 : a, 0),
      incorrect: answers.reduce((a, c) => c === false ? a + 1 : a, 0),
      unanswered: answers.reduce((a, c) => c === null ? a + 1 : a, 0),
    };
  }

  nextQuestionHandler = () => {
    return this.setState((prev) => ({ current: Math.min(prev.current + 1, prev.questions.length - 1) }));
  };

  prevQuestionHandler = () => {
    this.setState((prev) => ({ current: Math.max(prev.current - 1, 0) }));
  };

  answerQuestionHandler = (idx, correct) => {
    const answers = [...this.state.answers];
    answers[idx] = correct;
    this.setState(({ answers }),
      this.setState((prev) => ({ current: Math.min(prev.current + 1, prev.questions.length - 1) }),
        this.flipHandler(),
      )
    );
  };

  render() {
    const { current, questions, animate, answers } = this.state;
    const question = questions[current];

    const front = animate.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    const back = animate.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });

    const stats = answers.length ? this.getStatus(answers) : null;

    if (answers.length && !stats.unanswered) return <QuizSummary stats={stats} />;

    return (
      <View style={styles.container}>
        <View style={styles.ctrlContainer}>
          {stats && <Text>{`correct: ${stats.correct} | incorrect: ${stats.incorrect} | unanswered: ${stats.unanswered}`}</Text>}
          <Button title="<" type="outline" onPress={this.prevQuestionHandler} />
          <Button title=">" type="outline" onPress={this.nextQuestionHandler} />
        </View>
        {question && <View style={styles.cardContainer} >
          <TouchableOpacity onPress={this.flipHandler}>
            <Animated.View style={[{ transform: [{ rotateY: front }] }, styles.hidden]}>
              <QuizCard title={`Question #${current + 1}`} content={question.question} />
            </Animated.View>
            <Animated.View style={[{ transform: [{ rotateY: back }] }, styles.back, styles.hidden]}>
              <QuizCard
                title={`Answer #${current + 1}`}
                content={question.answer}
                answer={answers[current]}
                onAnswered={(correct) => this.answerQuestionHandler(current, correct)}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
  },
  cardContainer: {
    // alignSelf: 'stretch',
  },
  ctrlContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
  },
  hidden: {
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
  },
});

Quiz.propTypes = {
  route: PropTypes.shape({
    params: {
      questions: PropTypes.array.isRequired,
      answers: PropTypes.array.isRequired,
    },
  }),
};

export default connect()(Quiz);

