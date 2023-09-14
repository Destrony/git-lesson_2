import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    const path = "/dialogs/" + props.id;
    return <div className={s.dialog_item + ' ' + s.active}>
        <img className={s.photo} src={props.photo} alt=""/>
        <NavLink to={path}><span>{props.name}</span></NavLink>
    </div>
}

export default DialogItem;