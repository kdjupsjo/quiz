import React, {Component} from 'React';
import Quiz from './Quiz.js';
import quizQuestions from './api/questions';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {
              nintendo: 0,
              microsoft: 0,
              sony: 0
            },
            result: '', 
            test: 'hejhej'
           };
    }


    componentWillMount() {
        const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));  
        console.log(this.props.test)
        this.setState({
          question: quizQuestions[0].question,
          answerOptions: shuffledAnswerOptions[0]
        });
    }

    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      };


      render() {
        return (
          <div className="App">
            <div className="App-header">
              <h2>React Quiz</h2>
            </div>
            <Quiz
              answer={this.state.answer}
              answerOptions={this.state.answerOptions}
              questionId={this.state.questionId}
              question={this.state.question}
              questionTotal={quizQuestions.length}
              onAnswerSelected={this.handleAnswerSelected}
            />
          </div>
        )
      }
}
export default App;