import React from 'react';
import pokeballLogo from '../../assets/images/pokeball-logo.png';
import styled from '@emotion/styled';  

const Logo = styled.div`
        padding: 8px;
        height: 100%;
        box-sizing: border-box;
        border-radius: 5px;
    `

const Image = styled.img`
        height: 100%;
    `
const logo = (props) => (    
    <Logo>
        <Image src={pokeballLogo} alt="Pokemon" />
    </Logo>
);

export default logo;