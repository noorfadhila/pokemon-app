import React from 'react';
import styled from '@emotion/styled';

const BtnCancel = styled.button`
    font: inherit;
    background: #fce98a;
    padding: 0.5rem 1rem;
    color: #000;
    border: 1px solid #e2cf70;
    margin: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
  `;

const catchPokemonFailed = (props) => {
    return(
        <div>
            <p>Failed</p>
            <BtnCancel onClick={props.closeModal} type="button">Try Again</BtnCancel>
        </div>
    )
}

export default catchPokemonFailed;