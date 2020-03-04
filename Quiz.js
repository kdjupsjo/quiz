import React, { Component } from 'react';
import Question from './Question.jsx';
import AnswerOption from './Assets/AnswerOption.jsx';


class Quiz extends Component {
    constructor(props) {
        super(props);

        this.renderAnswer = this.renderAnswer.bind(this);
    }


    renderAnswer(key) {
        return(
            <AnswerOption
            key={key.id}
            answerType={key.id}
            onAnswerSelected={this.props.onAnswerSelected}
            answer={this.props.answer}
            content={key.content}
            ></AnswerOption>
        );
    }
    
    render(){
        return(
            <div>
                <Question questionLabel={this.props.question}/>

                <ul>
                {this.props.answerOptions.map(this.renderAnswer)}
                </ul>
            </div>
        );
    }
} 
export default Quiz;