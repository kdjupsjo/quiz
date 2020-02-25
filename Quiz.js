import React, { Component } from 'react';
import Question from './Question.jsx';
import Counter from './Assets/Counter.jsx';
import AnswerOption from './Assets/AnswerOption.jsx';


class Quiz extends Component {
    constructor(props) {
        super(props);

        this.renderAnswer = this.renderAnswer.bind(this);
    }


    renderAnswer(key) {
        return(
            <AnswerOption
            answerType={key.type}
            onAnswerSelected={this.props.onAnswerSelected}
            answer={this.props.answer}
            ></AnswerOption>
        );
    }
    
    render(){
        return(
            <div>
                <h1>Hello world!</h1>
                <Counter current={1} totalAmount={10} />
                <Question questionLabel={this.props.test}/>

                <ul>
                {this.props.answerOptions.map(this.renderAnswer)}
                </ul>
            </div>
        );
    }
} 
export default Quiz;