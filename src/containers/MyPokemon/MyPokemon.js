import React, { useState, useEffect } from 'react';
import MyPokemonList from '../../components/MyPokemonList/MyPokemonList';
import ErrorModal from '../../components/UI/ErrorModal';

const MyPokemon = props => {
    const [myPokemon, setMyPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        fetch('https://my-pokemon-f7c59-default-rtdb.firebaseio.com/owned.json')
          .then(response => response.json())
          .then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                nickname: responseData[key].nickname,
                pokemon_id: responseData[key].pokemon_id,
                pokemon_name: responseData[key].pokemon_name,
                image_url: responseData[key].image_url
              });
            }
            setMyPokemon(loadedIngredients);
          });
      }, []);

    const removePokemonHandler = pokemonId => {
        setIsLoading(true)
        fetch(`https://my-pokemon-f7c59-default-rtdb.firebaseio.com/owned/${pokemonId}.json`, {
        method: 'DELETE'
        })
        .then(response => {
            setIsLoading(false)
            setMyPokemon(prevPokemons =>
            prevPokemons.filter(pokemon => pokemon.id !== pokemonId)
            );
        })
        .catch(error => {
            setError('Something went wrong!');
        })
        
    };

    const clearError = () => {
        setError(null);
    }
        return (
            <div>
              {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
              <section>
                <MyPokemonList
                  pokemons={myPokemon}
                  onRemoveItem={removePokemonHandler}
                />
              </section>
            </div>
          );
}

export default MyPokemon;