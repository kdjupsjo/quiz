import React, { Component } from 'React';
import Quiz from './Quiz.js';
import quizQuestions from './api/questions';
import ResultBox from './Assets/ResultBox.jsx';
import results from './api/result';
import _ from 'lodash';
import Counter from './Assets/Counter.jsx';
import Button from './Buttons/button/button.jsx';
import Timer from './Assets/Timer.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      question: '',
      activeQuestions: [],
      answerOptions: [],
      answer: '',
      correctAnswerCount: 0,
      wrongAnswerCount: 0,
      unAnsweredCount: 0,
      result: '',
      finalscore: 0,
      fiftyUsed: false,
      topupTimeUsed: false
    };
    this.timer = React.createRef();
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.fiftyfifty = this.fiftyfifty.bind(this);
    this.topupTime = this.topupTime.bind(this);
    this.init = this.init.bind(this);
  };

  componentDidMount() {
    this.init();
  };

  init() {
    const shuffledQuestions = _.shuffle(quizQuestions).slice(0, 10);
    const shuffledAnswerOptions = shuffledQuestions.map((question) => _.shuffle(question.answers));

    this.setState({
      question: shuffledQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      activeQuestions: shuffledQuestions
    });
  }

  handleAnswerSelected(event) {
    this.setState({
      answer: event.currentTarget.value
    });
  };

  nextQuestion() {
    const counter = this.state.counter + 1;
    const activeQuestions = this.state.activeQuestions;
    const answerId = this.state.answer;

    let correctAnswerCount = this.state.correctAnswerCount;
    let wrongAnswerCount = this.state.wrongAnswerCount;
    let unAnsweredCount = this.state.unAnsweredCount;

    this.timer.current.reset();

    if (counter <= activeQuestions.length) {
      if (this.state.answer == '') {
        unAnsweredCount++;
      } else {
        const answer = _.find(this.state.answerOptions, function (answer) {
          return answer.id == answerId;
        });

        if (answer.type == 'true') {
          correctAnswerCount++;
        }
        if (answer.type == 'false') {
          wrongAnswerCount++;
        }
      }
      if (counter == activeQuestions.length) {
        this.setState({
          correctAnswerCount: correctAnswerCount,
          wrongAnswerCount: wrongAnswerCount,
          unAnsweredCount: unAnsweredCount,
          answer: ''
        }, this.finishQuiz);

      } else {
        this.setState({
          correctAnswerCount: correctAnswerCount,
          wrongAnswerCount: wrongAnswerCount,
          unAnsweredCount: unAnsweredCount,
          counter: counter,
          question: activeQuestions[counter].question,
          answerOptions: activeQuestions[counter].answers,
          answer: ''
        });
      }
    }
  }

  finishQuiz() {
    this.timer.current.clearInterval();
    let finalscore = Math.floor((this.state.correctAnswerCount / this.state.activeQuestions.length) * 100);
    if (finalscore == 0) {
      finalscore++;
    }
    let finalResult = '';

    _.forEach(results, function (result) {
      if (result.range.min < finalscore && finalscore <= result.range.max) {
        finalResult = result.content;
      }
    });

    this.setState({
      result: finalResult,
      finalScore: finalscore
    });
  }

  fiftyfifty() {
    if (this.state.fiftyUsed) {
      return;
    }

    let answerOptions = this.state.answerOptions;
    let correctAnswer = _.find(answerOptions, function (answer) {
      return answer.type == "true";
    });
    answerOptions = _.remove(answerOptions, function (answer) {
      return answer.type == "false";
    });

    var rand = this.getRandomInt(answerOptions.length);
    answerOptions.splice(rand, 1)
    rand = this.getRandomInt(answerOptions.length);
    answerOptions.splice(rand, 1);

    answerOptions.push(correctAnswer);
    answerOptions = _.shuffle(answerOptions);

    this.setState({
      answerOptions: answerOptions,
      fiftyUsed: true
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  topupTime(e) {

    if (this.state.topupTimeUsed) {
      return;
    }
    this.setState({
      topupTimeUsed: true
    });
    this.timer.current.topuptime();
  }

  render() {
    return (
      <div className="App">

        <h1>Quizzet</h1>
        <Counter current={this.state.counter} totalAmount={this.state.activeQuestions.length} />

        {this.state.result == '' ?
          <div >
            <Quiz
              answer={this.state.answer}
              answerOptions={this.state.answerOptions}
              question={this.state.question}
              onAnswerSelected={this.handleAnswerSelected}
            />

            <Button
              onClick={this.nextQuestion}
              content='Nästa fråga'
              disabled={false}
              lifeLine={false}
              >
            </Button>

            <Button
              onClick={this.fiftyfifty}
              disabled={this.state.fiftyUsed}
              lifeLine={true}
              content='50/50'>

            </Button>

            <Button
              onClick={this.topupTime}
              disabled={this.state.topupTimeUsed}
              lifeLine={true}
              content='10+'>
            </Button>
            <Timer ref={this.timer}
              nextQuestion={this.nextQuestion} />
          </div> :
          <ResultBox
            content={this.state.result}
            score={this.state.finalscore}
            correct={this.state.correctAnswerCount}
            wrong={this.state.wrongAnswerCount}
            unanswered={this.state.unAnsweredCount}>
          </ResultBox>}
      </div>
    )
  }
}
export default App;