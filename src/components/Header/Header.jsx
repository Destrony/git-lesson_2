import React from 'react';
import hed from './Header.module.css';
import {NavLink} from "react-router-dom";
const Header = (props) => {
    return <header className={hed.header}>
    <img src = "https://i.pinimg.com/236x/07/14/3b/07143b2bffd08f886397aa10095cf263.jpg?nii=t"></img>
        <div className={hed.loginBlock}>
            {props.isAuth ?<div>{props.login} - <button onClick={props.logout}>Log out</button></div>
           : <NavLink to = {'/login'}>Login</NavLink>}
        </div>
  </header>

    
}

export default Header;