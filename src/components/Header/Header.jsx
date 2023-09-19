import React from 'react';
import hed from './Header.module.css';
import {NavLink} from "react-router-dom";
const Header = (props) => {
    return <header className={hed.header}>
    <img src = "https://mir-s3-cdn-cf.behance.net/projects/max_808/d3500d136003235.Y3JvcCw4MDgsNjMyLDAsMA.jpg"></img>
        <div className={hed.loginBlock}>
            {props.isAuth ?<div>{props.login} - <button onClick={props.logout}>Log out</button></div>
           : <NavLink to = {'/login'}>Login</NavLink>}
        </div>
  </header>

    
}

export default Header;