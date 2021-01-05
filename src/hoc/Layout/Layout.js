import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Home from '../../containers/Home/Home';
import Detail from '../../containers/Detail/Detail';
import MyPokemon from '../../containers/MyPokemon/MyPokemon';

function Layout () {
    const [userPokemons, setUserPokemons] = useState([]);
    useEffect(() => {
      fetch('https://my-pokemon-f7c59-default-rtdb.firebaseio.com/owned.json')
        .then(response => response.json())
        .then(responseData => {
          const loadedPokemons = [];
          for(const key in responseData){
            loadedPokemons.push({
              id: key,
              image_url: responseData[key].image_url,
              nickname: responseData[key].nickname,
              pokemon_id: responseData[key].pokemon_id,
              pokemon_name: responseData[key].pokemon_name,
            })
          }
          setUserPokemons(loadedPokemons);
        })
    }, []);

    const renderMyPokemonList = props => {
      return <MyPokemon {...props} pokemonList={userPokemons} />;
    };
    const renderPokemonList = props => {
      return <Home {...props} />;
    };
    const renderPokemonDetail = props => {
      return <Detail {...props} ownedPokemon={userPokemons} />;
    };
    return(
        <div>
            <Toolbar />
            <Route
                exact
                path="/mypokemon"
                render={props => renderMyPokemonList(props)}
              />
            <Route 
              path="/" 
              exact 
              render={props => renderPokemonList(props)}
              />
            <Route path={'/detail/:id'} 
            render={props => renderPokemonDetail(props)} />
        </div>
    )
} 

export default Layout;