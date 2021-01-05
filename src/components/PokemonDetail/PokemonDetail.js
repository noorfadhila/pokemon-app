import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 10px 20px;
  margin: 10px;
`

const CardBody = styled.div`
  text-align: left;
`

const UL = styled.ul`
  padding-left: 0;
`

const LI = styled.li`
  margin: 0 3px;
`

const Pokemon = (props) => {

  return(
    <div className='pa4 flex justify-center'>
                  
        <img src={props.pokemonData.pokemon.sprites.front_default} role='presentation' className='w-100 mv3 pa4' />
        
        <Card>
          <CardBody className="flex justify-content-start">
            <p>Abilities:</p>
            <UL>
              {props.pokemonData.pokemon.abilities.map((abilities, index) => (
                <LI className="badge badge-warning" key={index}>{abilities.ability.name}</LI>
              ))}
            </UL>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex justify-content-start">
            <p>Type:</p>
            <UL>
              {props.pokemonData.pokemon.types.map((types, index) => (
                <LI className="badge badge-info" key={index}>{types.type.name}</LI>
              ))}
            </UL>
          </CardBody>
        </Card>
    </div>
  )
} 

export default Pokemon;