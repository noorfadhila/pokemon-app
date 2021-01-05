import React, {useState} from 'react';
import styled from '@emotion/styled';
import classes from './CatchPokemon.module.css';

const CatchPokemonSuccess = React.memo(props => {
    
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const [enteredNickname, setEnteredNickname] = useState('');
  const [nameExist, setNameExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const ErrMsg = styled.p`
    color: #FF0000;
  `;

  const BtnSubmit = styled.button`
    font: inherit;
    background: #ff2058;
    padding: 0.5rem 1rem;
    color: white;
    border: 1px solid #ff2058;
    margin: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
  `;

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

  const submitHandler = event => {
      event.preventDefault();
      const { name } = props.pokemonData.pokemon;
      // const nickName = enteredNickname;
      // check if nickname = owned pokemon name
      let foundPokemon =
      props.ownedPokemon.length > 0
        ? props.ownedPokemon.filter(poke => {
            if (poke.pokemon_name === name) {
              return poke.nickname === enteredNickname ? true : false;
            } else {
              return false;
            }
          })
      : false;

      if (foundPokemon.length > 0) {
        setNameExist(true);
        return false;
      }else{
        setNameExist(false);
        props.onAddNickname({
          nickname: enteredNickname,
          image_url: props.pokemonData.pokemon.sprites.front_default,
          pokemon_name: props.pokemonData.pokemon.name,
          pokemon_id: props.pokemonData.pokemon.id
        })
      }
    };
  
  let errMessage = "";
  if(nameExist){
    errMessage = <ErrMsg>Name already Exist!</ErrMsg>
  }

  return(
          <div>
              <p>Success!</p>
              <form onSubmit={submitHandler}>
                <div className={classes.formControl}>
                    <input type="text" id="nickname" 
                        value={enteredNickname}
                        onChange={event => {setEnteredNickname(event.target.value)}}/>
                </div>
                {errMessage}
                <BtnCancel onClick={props.closeModal} type="button">Close</BtnCancel>
                <BtnSubmit type="submit">Save</BtnSubmit>
              </form>
              
          </div>
      )
});

export default CatchPokemonSuccess;