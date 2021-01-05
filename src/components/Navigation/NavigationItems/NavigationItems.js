import React from 'react';
import classes from './NavigationItems.module.css';
import {NavLink} from 'react-router-dom';


const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to="/"
            activeClassName={classes.active}
            exact>Home
        </NavLink>
        <NavLink 
            to="/mypokemon"
            activeClassName={classes.active}
            exact>My Pokemons
        </NavLink>
    </li>
);

export default navigationItem;