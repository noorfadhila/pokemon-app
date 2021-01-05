import React, { useState, useEffect } from 'react';
import { useQuery, gql, } from '@apollo/client';
import styled from '@emotion/styled';
import PokemonDetail from '../../components/PokemonDetail/PokemonDetail';
import Modal from '../../components/UI/Modal/Modal';
import CatchPokemonSuccess from '../../components/CatchPokemon/CatchPokemonSuccess';
import CatchPokemonFailed from '../../components/CatchPokemon/CatchPokemonFailed';
import pokeballLogo from '../../assets/images/pokeball.gif';
import Spinner from '../../components/UI/Spinner/Spinner';

const GET_POKEMON = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
        id
        name
        sprites{
            front_default
        }
        abilities {
            ability {
            name
            }
        }
        moves {
            move {
            name
            }
        }
        types {
            type {
            name
            }
        }
        message
        status
        }
    }
    `;

function Detail (props) {
    
    // const [state, dispatch] = useContext(Context);
    const [pokemonData, setPokemonData] = useState(undefined);
    const [pokemonName, setPokemonName] = useState('');
    const [successCatch, setSuccessCatch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [err, setErr] = useState();

    const { loading, error, data } = useQuery(GET_POKEMON, {
        variables:{"name": props.match.params.id}
    }, []);

    useEffect(() => {
        if(!loading && data){
            setPokemonData(data);
        }
      }, [loading, data])
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{`Error: ${error.message}`}</p>;
    
    

    // const { called, loading, data } = useLazyQuery(
    //     GET_POKEMON,
    //     { variables: { name: pokemonName } }
    //   );
    //   if (called && loading) return <p>Loading ...</p>
    //   if (!called) {
    //     return setTimeout(() => {
    //         setPokemonData(data)
    //     }, 3000)
    //   }

    const Title = styled.h3`
        text-transform: capitalize;
    `;
    const BtnCatch = styled.input`
        background-color: '#2BC3A1';
        line-height: 1;
        font-size: 18px;
        cursor: pointer;
        font-weight: 300;
        border-radius: 4px
    `

    const BottomNav = styled.div`
        background-color: #ffffff;
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
    `;
    
    const catchPokemonHandler = () => {
        setIsFinish(true);
        let rand = Math.floor(Math.random() * 2);
        if(rand == "0"){
            setSuccessCatch(true);
        }else{
            setSuccessCatch(false);
        }
    }

    const finishPlayHandler = () => {
        setIsFinish(false);
    }

    const saveNicknameHandler = pokemon => {
        setIsLoading(true);
        fetch('https://my-pokemon-f7c59-default-rtdb.firebaseio.com/owned.json', {
          method: 'POST',
          body: JSON.stringify(pokemon),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            setIsLoading(false);
            
            return response.json();
        })
        .then(responseData => {
            props.history.push('/mypokemon')
        });
      };
      

      let pokemonDetail = <p>Loading...</p>
        if(pokemonData){
            pokemonDetail = <PokemonDetail pokemonName={pokemonName} pokemonData={pokemonData}/>
        }else{
            pokemonDetail = <h1>Not Found!</h1>
        }
        
        let catchPokemon;
        
        if(successCatch){
            catchPokemon = <CatchPokemonSuccess 
                            closeModal={finishPlayHandler}
                            onAddNickname={saveNicknameHandler} 
                            pokemonData={pokemonData}
                            ownedPokemon={props.ownedPokemon}/>
        }else{
            catchPokemon = <CatchPokemonFailed closeModal={finishPlayHandler}/>
        }

        if(isLoading){
            catchPokemon = <Spinner />
        }

        return(
            <React.Fragment>
                <Title className="mt-2">{props.match.params.id}</Title>
                {pokemonDetail}
                <BottomNav>
                    <BtnCatch type="image" src={pokeballLogo} alt="Submit" onClick={catchPokemonHandler} width="100" height="100" />
                </BottomNav>
                <Modal show={isFinish} modalClosed={finishPlayHandler}>
                    {/* children */}
                    {catchPokemon}
                </Modal>
            </React.Fragment>
        );
}

export default Detail;