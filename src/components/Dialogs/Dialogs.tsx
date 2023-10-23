import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import AddMessageForm
    from "./Message/AddMessageForm/AddMessageForm";
import {
    InitialStateType
} from "../../redux/dialogs-reducer";
import {PhotosType} from "../../types/types";



type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
    isAuth: boolean
    photo: PhotosType
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}
const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage;
    let dialogsElements = state.dialogData.map(dia =>
        <DialogItem name={dia.name} key={dia.id} id={dia.id}
                    photo={dia.photo}/>);
    let messagesElements = state.messagesData.map(mess =>
        <Message message={mess.message} key={mess.id}/>);

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    }
    if (!props.isAuth) return <Navigate to={"/login"}/>;

    return (
        <div className={s.dialog}>
            <div className={s.dialog_body}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>  {messagesElements}
                </div>
                    <div className={s.spaceTextArea}>
                        <AddMessageForm onSubmit={addNewMessage} />
                    </div>
            </div>

        </div>
    )
}
export default Dialogs;