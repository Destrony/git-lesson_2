import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import AddMessageForm
    from "./Message/AddMessageForm/AddMessageForm";


const Dialogs = (props) => {
    let state = props.dialogsPage;
    let dialogsElements = state.dialogData.map(dia =>
        <DialogItem name={dia.name} key={dia.id} id={dia.id}
                    photo={dia.photo}/>);
    let messagesElements = state.messagesData.map(mess => <Message message={mess.message} key={mess.id}/>);
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }
    if (!props.isAuth) return <Navigate to={"/login"}/>;

    return (
        <div className={s.dialog}>
            <div className={s.dialog_body}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>  {messagesElements} </div>

            </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    )
}
export default Dialogs;