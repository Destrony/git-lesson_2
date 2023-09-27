const SEND_MESSAGE = 'SEND_MESSAGE';


type DialogType = {
    id: number
    name: string
    photo: string
}
type MessageType = {
    id: number
    message: string
}
let initialState = {

    dialogData: [
        {
            id: 1,
            name: 'Vika',
            photo: 'https://ip1.anime-pictures.net/previews/8c5/8c5dccd7ae4cdff7a27403c0400c4499_cp.jpg'
        },
        {
            id: 2,
            name: 'Artem',
            photo: 'https://w7.pngwing.com/pngs/175/324/png-transparent-anime-desktop-bleach-oreimo-animation-anime-face-black-hair-photography-thumbnail.png'
        },
        {
            id: 3,
            name: 'Georgii',
            photo: 'https://cdn.oboi7.com/static/images/s/14/fa/14faf7e6a5c253be9ff87b6b1a8965847cd73232.png'
        },
        {
            id: 4,
            name: 'Maksim',
            photo: 'https://i.pinimg.com/236x/ef/d8/a3/efd8a347de23e8c376de18e2f5a1d755.jpg'
        },
        {
            id: 5,
            name: 'Tatiana',
            photo: 'https://i.pinimg.com/originals/03/f3/49/03f349997190c84f73c380c07c6102ff.jpg'
        } ,
        {
            id: 6,
            name: 'Dasha',
            photo: 'https://sun9-7.userapi.com/impf/c625621/v625621814/25c47/AbIcYY9p_3k.jpg?size=320x240&quality=96&sign=09ec26f37eb0176ecfa61705761b8059&c_uniq_tag=D-bt_MwZPB9sxP8Zd3ix1LglNDi7BgDq8SWzuo72KcI&type=album'
        }
    ] as Array<DialogType>,
    messagesData: [
        {id: 1, message: 'Hi'},
        {
            id: 2,
            message: 'I hate all over the world'
        },
        {id: 3, message: 'My name is Pain'},
        {id: 4, message: 'My name is Pain'},
        {id: 5, message: 'My name is Pain'}
    ] as Array<MessageType>
}
export type InitialStateType = typeof initialState;
 const dialogsReducer = (state = initialState, action: any):InitialStateType  => {
     switch (action.type) {
         case SEND_MESSAGE:
             let body = action.newMessageBody;
             return {
                 ...state,
                 messagesData: [...state.messagesData, {id: 6, message: body}]
             };
         default:
             return state;
     }
 }

 type SendMessageCreatorActionType = {
     type: typeof SEND_MESSAGE
     newMessageBody: string
 }
export const sendMessageCreator = (newMessageBody:string):SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody})
export default dialogsReducer;