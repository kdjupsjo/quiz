import React, {Component} from 'react';

class Question extends Component {
    constructor(props) {
        super(props);
  
    }

    render(){

        return(
            <div>
                <div>
                    <h1>{this.props.questionLabel}</h1>
                </div>
            </div>
        )
    }
}

export default Question;