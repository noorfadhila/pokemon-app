import React from 'react';
import {
    Grid
  } from "@material-ui/core";
import styled from '@emotion/styled';
import PokemonList from '../../components/PokemonList/PokemonList';

const H2 = styled.h2`
  border-bottom: 3px solid #ccc;
  padding-bottom: 1rem;
`

function Home (props) {
    return(
        <React.Fragment>
            <Grid container justify="center">
            <Grid item xs={12} md={6}>
                <H2>All Pokemons</H2>
                <div className="">
                <PokemonList {...props}/>
                </div>
            </Grid>
            </Grid>
        </React.Fragment>
    )
} 

export default Home;