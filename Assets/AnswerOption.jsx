import React, {Component} from 'React';
import Checkbox from '../Buttons/Checkbox/Checkbox.jsx';

class AnswerOption extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <li>
                <label>
                    <Checkbox 
                        checked = {this.props.answerType === this.props.answer}
                        onChange = {this.props.onAnswerSelected}
                        />
                    <span style={{ marginLeft: 8 }}>Answer 1</span>
                </label>
            
            </li>
        )
    }
}
export default AnswerOption;