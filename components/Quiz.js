import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { FrontCard, BackCard } from './QuizCard';
import QuizSummary from './QuizSummary';

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

  nextQuestionHandler = () => {
    this.flipHandler();
    this.setState((prev) => ({ current: prev.current + 1 }));
  };

  prevQuestionHandler = () => {
    this.setState((prev) => ({ current: Math.max(prev.current - 1, 0) }));
  };

  answerQuestionHandler = (idx, correct) => {
    const answers = [...this.state.answers];
    answers[idx] = correct;
    this.setState({ answers });
  };

  restartQuizHandler = () => {
    const { questions } = this.state;
    const answers = new Array(questions.length).fill(null);
    this.setState({ current: 0 }, this.setState({ answers }));
  };

  render() {
    const { current, questions, animate, answers, isFlipped } = this.state;
    const question = questions[current];

    const front = animate.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    const back = animate.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });

    if (current && current === questions.length)
      return <QuizSummary questions={questions} answers={answers} onRestart={this.restartQuizHandler} />;

    return (
      <View style={styles.container}>
        {/* <View style={styles.ctrlContainer}>
          <Button title="Flip" onPress={this.flipHandler} />
          {stats && <Text>{`correct: ${stats.correct} | incorrect: ${stats.incorrect} | unanswered: ${stats.unanswered}`}</Text>}
          <Button title="<" type="outline" onPress={this.prevQuestionHandler} />
          <Button title=">" type="outline" onPress={this.nextQuestionHandler} />
        </View> */}
        {question && <View >
          {
            !isFlipped ? (
              <Animated.View style={[{ transform: [{ rotateY: front }] }, styles.hidden]}>
                <FrontCard
                  title={`Question ${current + 1} of ${questions.length}`}
                  question={question.question}
                  showAnswer={this.flipHandler} />
              </Animated.View>
            ) : (
                <Animated.View style={[{ transform: [{ rotateY: back }] }, styles.hidden]}>
                  <BackCard
                    title={`Answer #${current + 1}`}
                    content={question}
                    answer={answers[current]}
                    onNext={this.nextQuestionHandler}
                    onAnswered={(correct) => this.answerQuestionHandler(current, correct)}
                  />
                </Animated.View>
              )
          }
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f1fa',
  },
  ctrlContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
  },
  hidden: {
    backfaceVisibility: 'hidden',
  },
});

Quiz.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      questions: PropTypes.array.isRequired,
      answers: PropTypes.array.isRequired,
    }),
  }),
};

export default Quiz;

