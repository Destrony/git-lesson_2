import React from 'react';
import classes from './NavBar.module.css';
import {NavLink} from "react-router-dom";
// let classes =  {
//   'nav': 'NavBar_nav__2mFux ',
//   'item': 'NavBar_item__wjYz1'
// };
const NavBar = () => {
    return <nav className={classes.nav}>
    <div>
      <NavLink to="/profile" className={navData => navData.isActive ? classes.active : classes.item}>Profile</NavLink>
    </div>
    <div>
      <NavLink to = "/dialogs" className={navData => navData.isActive ? classes.active : classes.item}>Message</NavLink>
    </div>
        <div>
      <NavLink to="/users" className={navData => navData.isActive ? classes.active : classes.item}>Users</NavLink>
    </div>
    <div>
      <NavLink to ="/info"  className={navData => navData.isActive ? classes.active : classes.item} >Info</NavLink>
    </div>
    <div >
      <NavLink to= "/music" className={navData => navData.isActive ? classes.active : classes.item}>Music</NavLink>
    </div>
    <div>
      <NavLink to="/settings" className={navData => navData.isActive ? classes.active : classes.item}>Settings</NavLink>
    </div>
    
  </nav>

    
}

export default NavBar;