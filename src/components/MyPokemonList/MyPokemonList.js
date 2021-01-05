import React from 'react';
import styled from '@emotion/styled';
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyPokemonList = props => {

    const Section = styled.section`
        width: 30em;
        max-width: 90%;
        margin: auto;
        @media (min-width: 400px) {
            width: 50em;
        }
    `

    const H2 = styled.h2`
        border-bottom: 3px solid #ccc;
        padding-bottom: 1rem;
    `
    const Ul = styled.ul`
        list-style: none;
        margin: 0;
        padding: 0;
    `
    const PokeName = styled.span`
        color: #aaa;
        text-transform: capitalize;
        font-style: italic;
    `

    const PokeNick = styled.span`
        font-weight: 600;
    `

    const Li = styled.li`
        margin: 1rem 0;
        padding: 0.5rem 1rem;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.26);
        display: flex;
        justify-content: space-between;
    `

    const PokeContainer = styled.span`
        width: 100%
    `

    const Image = styled.img`
        width: 80px;
    `

    const BtnRelease = styled.button`
        color: red;
        border: none;
        background-color: transparent;
        font-size: 35px;
    `

    return (
    
        <Section>
            <H2>My Pokemon</H2>
            <Ul>
                {props.pokemons.map(ig => (
                    <Li key={ig.id}>
                        <PokeContainer className="row d-flex align-items-center">
                            <div className="col-4">
                                <Image
                                    src={ig.image_url}
                                />
                            </div>
                            <div className="col-6 text-left">
                                <div className="row">
                                    <PokeNick className="col-12">
                                        <span>{ig.nickname}</span>
                                    </PokeNick>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <PokeName>{ig.pokemon_name}</PokeName>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <BtnRelease onClick={props.onRemoveItem.bind(this, ig.id)}>
                                    <FontAwesomeIcon icon={faMinusSquare} />
                                </BtnRelease>
                            </div>
                        </PokeContainer>
                    </Li>
                ))}
            </Ul>
        </Section>
  );
};

export default MyPokemonList;
