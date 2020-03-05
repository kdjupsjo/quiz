import React from 'react'; 
import styled from 'styled-components';

const StyledButton = styled.button`
    border: 3px solid #7dc791; 
    border-radius: 3px;
    background-color: #7dc791;
    color: #fff; 
    padding: 15px; 
    margin: 10px;
    text-align: center;
    font-size: 16px; 
    font-weight: bold;
    
    :hover{
        background-color: #35523d;
        border: 3px solid #35523d;
    }
    :disabled {
        background-color: #a1b5a7;
        border-color: #a1b5a7;
    }
`

const Button = ({className, onClick, ...props}) => (
    <StyledButton   className={className}
                    onClick={onClick}
                    disabled={props.disabled}
>{props.content}</StyledButton>
)

export default Button;
