import React, {Component} from 'React';
import styled from 'styled-components'; 

const Box = styled.div`
    border: 3px solid #7dc791; 
    border-radius: 3px;
    color: #7dc791; 
    width:80%; 
    margin: 5%;
    text-align: center;
    vertical-align: center;
    min-height: 200px;
`

const MiniBox = styled.div`
    display: inline-block;
    border: 3px solid ${props => props.color};
    border-radius: 3px;
    color: ${props => props.color};
    width:25%; 
    margin: 3%;
`

class ResultBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Box>
                <h3>
                    {this.props.content}
                </h3>

                <MiniBox color='#7dc791'>Rätt svar: {this.props.correct}</MiniBox>
                <MiniBox color='red'>Fel svar: {this.props.wrong}</MiniBox>
                <MiniBox color='gray'>Ej svarat: {this.props.unanswered}</MiniBox>

            </Box>
        )
    }
}
export default ResultBox;