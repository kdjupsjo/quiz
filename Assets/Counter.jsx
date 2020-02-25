import React, {Component} from 'react'; 
import styled from 'styled-components';


const CurrentQuestion = styled.span`
    color: green;
    border: 1px solid green;
    border-radius: 4px;
    padding: 5px;
    margin: 5px;
`
const TotalAmount = styled.span`
    color: red;
    border: 1px solid red;
    border-radius: 4px;
    padding: 5px;
    margin: 5px;
`


class Counter extends Component {
    render() {
        return(
            <div>
                <CurrentQuestion>{this.props.current}</CurrentQuestion>
                / 
                <TotalAmount>{this.props.totalAmount}</TotalAmount>
            
            </div>
        );
    }
}
export default Counter;