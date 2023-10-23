import React, {useEffect, useRef, useState} from "react";
import chp from './ChatPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    sendMessage,
    startMessagesListening,
    stopMessagesListening
} from "../../redux/chat-reducer";
import {
    AppDispatch,
    AppStateType
} from "../../redux/redux-store";
import {ChatMessageAPIType} from "../../api/chat-api";


const ChatPage: React.FC= () => {
    return <div>
        <Chat />
    </div>
}
const Chat: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
    useEffect(() => {
        dispatch(startMessagesListening())
return () => {
    dispatch(stopMessagesListening())
}
    }, [dispatch])


     return <div>
         {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
             <>
         <Messages />
         <AddMessageForms />
             </>

     </div>

}
const Messages: React.FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] =
        useState(false)
        const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
            const element = e.currentTarget;
            let differenceWhatWeSee = element.scrollHeight - element.scrollTop;
            let value = Math.abs(differenceWhatWeSee - element.clientHeight);
            if (value < 300) {
                if (!isAutoScroll) {
                    setIsAutoScroll(true)
                }
            } else {
                if (isAutoScroll) {
                    setIsAutoScroll(false)
                }
            }
        }
    useEffect(() => {
        if (isAutoScroll) {
            setTimeout (() => {
                messagesAnchorRef.current?.scrollIntoView({behavior: "smooth", })
            }, 200)
        }
    }, [messages])
        return <div style={{height: '400px', overflowY: "auto"}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m} />)}
    <div ref={messagesAnchorRef}></div>
    </div>

}
const Message: React.FC<{message: ChatMessageAPIType}> = React.memo
(({message}) => {
     return <div className={chp.photoSize}>
         <img src={message.photo} alt={'icon'}/>
         <b>{message.userName}</b>
         <br/>
         {message.message}
         <hr/>
     </div>

})

const AddMessageForms: React.FC<{}> = ({}) => {
    const [message, setMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) =>
                setMessage(e.currentTarget.value)} ></textarea>
        </div>
        <div>
            <button disabled={status !== 'ready'}
                    onClick={sendMessageHandler}>Send</button>
        </div>
    </div>

}
export default ChatPage;
// export type AppDispatch = ThunkDispatch<AppStateType, any, AppAction>
// type AppAction = ReturnType<typeof store.dispatch>
