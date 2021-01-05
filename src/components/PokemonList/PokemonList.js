import React, {Fragment, useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  ListItemText
} from "@material-ui/core";
import styled from '@emotion/styled';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GET_POKEMON = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;


function PokemonList(props) {

  const { loading, error, data, fetchMore } = useQuery(GET_POKEMON);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currOffset, setCurrOffset] = useState(20)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;


    const pokemonSelectedHandler = ( id ) => {
        props.history.push( '/detail/' + id );
    }

    const Card = styled.div`
        background-color: white;
        box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        padding: 10px 20px;
        margin: 10px;
    `

    const Image = styled.img`
        width: 80px;
    `

    const BottomNav = styled.div`
        background-color: #F96167;
        color: #fce98a;
        padding: 10px 20px;
        margin: 0;
        position: sticky;
        height: 56px;
        width: 100%;
        z-index: 90;
        box-sizing: border-box;
        bottom: 0;
        left: 0;
        font-size: 30px;
    `
    
    return(
      <Fragment>
        
        {
            data.pokemons &&
            data.pokemons.next &&
              (isLoadingMore ? (
                <p>Loading...</p>
              ) :
              <div className="row px-3"> 
                {data.pokemons.results.map(poke => (
                  <div
                    className='col-6 col-sm-3 px-0'
                    key={poke.id}
                    onClick={() => pokemonSelectedHandler(poke.name)} >
                    <Card>
                      <Image alt={poke.image} src={poke.image} />
                      <ListItemText
                        primary={poke.name}
                      />
                    </Card>
                </div>
                ))}
                
                <BottomNav className="row">
                  <div className="col-6">
                    <FontAwesomeIcon onClick={async () => {
                      setIsLoadingMore(true);
                      if(data.pokemons.prev){
                        setCurrOffset(currOffset - 20);
                        await fetchMore({
                          variables: {
                            "offset": currOffset
                          }
                        });
                      }else{
                        alert("Not Allowed!")
                      }
                      setIsLoadingMore(false);
                    }} 
                    icon={faArrowLeft} />
                  </div>
                  <div className="col-6">
                    <FontAwesomeIcon onClick={async () => {
                      setIsLoadingMore(true);
                      if(data.pokemons.next){
                        setCurrOffset(currOffset + 20)
                        await fetchMore({
                          variables: {
                            "offset": currOffset
                          }
                        });
                      }else{
                        alert("Not Allowed!")
                      }
                      setIsLoadingMore(false);
                    }} 
                    icon={faArrowRight} />
                  </div>
                </BottomNav>
                </div>
                
              )
          }
      </Fragment>
    );
}

export default PokemonList;