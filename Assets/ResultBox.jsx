import React, {Component} from 'React';
import styled from 'styled-components'; 


const Box = styled.div`
    border: 3px solid #7dc791; 
    border-radius: 3px;
    color: #7dc791; 
    width:80%; 
    margin: 10%;
    text-align: center;
    vertical-align: center;
    min-height: 200px;
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
            </Box>
        )
    }
}
export default ResultBox;