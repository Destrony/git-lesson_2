import {profileAPI, usersAPI as userAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {
    PhotosType,
    PostsType,
    ProfileType
} from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 1, message: 'Hi lorem we are crazy', count: 76},
        {id: 2, message: 'i floora we are crazy', count: 32},
        {id: 3, message: 'Hi you we are crazy', count: 15},
        {id: 4, message: 'Hi you we are crazy', count: 25}
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};

export type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                count: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }


}

type AddPostActionCreatorActionType = {
type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText:string):AddPostActionCreatorActionType => ({
    type: ADD_POST,
    newPostText
})
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
})

type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status:string):setStatusActionType => ({
    type: SET_STATUS,
    status
})
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId:number):DeletePostActionType => ({
    type: DELETE_POST,
    postId
})
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
})
export const getUserProfile = (userId:number) => async (dispatch:any) => {
    let response = await userAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}
export const updateStatus = (status:string) => async (dispatch:any) => {
    try {

    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
    } catch (error) {

    }
}
export const savePhoto = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);

    }
}
export default profileReducer;