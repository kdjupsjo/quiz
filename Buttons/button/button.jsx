import React from 'react'; 
import styled from 'styled-components';

const StyledButton = styled.div`
    border: 3px solid #7dc791; 
    border-radius: 3px;
    background-color: #7dc791;
    color: #fff; 
    padding: 10px; 
    margin: 10px;
    text-align: center;
    
    :hover{
        background-color: #35523d;
        border: 3px solid #35523d;
    }
`

const Button = ({className, onClick, disabled, ...props}) => (
    <StyledButton   className={className}
                    onClick={onClick}
                    disabled={disabled}
    >Nästa fråga</StyledButton>
)

export default Button;
