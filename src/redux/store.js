import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";



let store = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    message: 'Hi lorem we are crazy',
                    count: 76
                },
                {
                    id: 2,
                    message: 'i floora we are crazy',
                    count: 32
                },
                {
                    id: 3,
                    message: 'Hi you we are crazy',
                    count: 15
                }
            ],
            newPostText: 'it-win-Naruto'
        },

        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {

        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
};



export default store;
window.store = store;
