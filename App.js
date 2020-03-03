import React, {Component} from 'React';
import Quiz from './Quiz.js';
import quizQuestions from './api/questions';
import ResultBox from './Assets/ResultBox.jsx';
import results from './api/result';
import _ from 'lodash';
import Counter from './Assets/Counter.jsx';
import update from 'react-addons-update';
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
            answersCount: {
              nintendo: 0,
              microsoft: 0,
              sony: 0
            },
            result: ''
           };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    };

    componentDidMount() {
      const shuffledQuestions = _.shuffle(quizQuestions).slice(0, 3);
      const shuffledAnswerOptions = shuffledQuestions.map((question) => _.shuffle(question.answers));  
        
        this.setState({
          question: shuffledQuestions[0].question,
          answerOptions: shuffledAnswerOptions[0],
          activeQuestions: shuffledQuestions
        });
    };
      handleAnswerSelected(event) {
        this.setState({
          answer: event.currentTarget.value
        });
      };

      nextQuestion() {
        const counter = this.state.counter + 1;
        const activeQuestions = this.state.activeQuestions;

        if(counter < activeQuestions.length) {
          const answer = this.state.answer.toLowerCase();
         
          const updatedAnswerCount = update(this.state.answersCount, {
            [answer]: {$apply: function (currentValue) { return currentValue + 1;}}
          });

          this.setState({
            answersCount: updatedAnswerCount,
            counter: counter,
            question: activeQuestions[counter].question,
            answerOptions: activeQuestions[counter].answers,
            answer: ''
          });
        } 
        else {
          this.finishQuiz();
        }
        
      }
      finishQuiz() {
        const answerKeys = Object.keys(this.state.answersCount);
        const answerList = answerKeys.map((key) => this.state.answersCount[key]); 
        const maxValue = Math.max.apply(Math, answerList);
        const highestScoringType = answerKeys.filter((key) => this.state.answersCount[key] == maxValue)[0];
        const result = results.filter((r) => r.type.toLowerCase() == highestScoringType);
      
        this.setState({
          result: result[0].content
        });
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


                <div style={{width: "200px"}}>
                  <Button
                    onClick={this.nextQuestion}
                    disabled={this.state.answer == ''}>
                    
                    Nästa fråga
                  </Button>
                </div>
              </div> : 
              <ResultBox content={this.state.result}>
              </ResultBox> }

              <Timer nextQuestion={this.nextQuestion}/>
          </div>

        )
      }
}
export default App;