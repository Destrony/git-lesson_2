import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers.js';
import {UsersType} from '../types/types';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_RANDOM_PLACE = 'SET_RANDOM_PLACE';



let initialState = {
    randomPlace: [
        "Австралия", "Австрия", "Азербайджан", "Албания", "Алжир",
        "Ангола", "Андорра", "Антигуа",  "Барбуда", "Аргентина", "Армения",
        "Афганистан", "Багамские", "Острова", "Бангладеш", "Барбадос", " Бахрейн"," Белиз",
        " Белоруссия"," Бельгия"," Бенин"," Болгария"," Боливия"," Босния и Герцеговина", "Ботсвана"],
    // cities: [
    //     "Абаза", "Абакан", "Абдулино", "Абинск",
    //     "Агидель", "Агрыз", "Адыгейск", "Азнакаево", "Азов", "Ак-Довурак", "Аксай",
    //     "Алагир", "Алапаевск", "Алатырь", "Алдан", "Алейск", "Александров", "Александровск",
    //     "Александровск-Сахалинский", "Алексеевка", "Алексин", "Алзамай", "Алупка", "Алушта",
    //     "Альметьевск", "Амурск", "Анадырь", "Анапа", "Ангарск", "Андреаполь", "Анжеро-Судженск",
    //     "Анива", "Апатиты", "Апрелевка", "Апшеронск", "Арамиль", "Аргун", "Ардатов", "Ардон", "Арзамас",
    //     "Аркадак", "Армавир", "Армянск", "Арсеньев"]
    //     as Array<string>,],
    users: [ ] as Array<UsersType>,
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of
    // user id
};
export type InitialStateType = typeof initialState
const usersReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case FOLLOW:
    return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
    }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USER_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
               followingInProgress: action.isFetching
                   ? [...state.followingInProgress, action.userId]
                   : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case SET_RANDOM_PLACE: {
            return {...state, randomPlace: action.randomPlace }
        }
        default:
            return state;
    }


}

type FollowSucessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSucess = (userId:number):FollowSucessActionType => ({type: FOLLOW, userId})
type UnfollowSucessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSucess = (userId:number):UnfollowSucessActionType =>({type: UNFOLLOW, userId})
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users:Array<UsersType>):SetUsersActionType =>({type: SET_USERS, users})
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType =>({type: SET_CURRENT_PAGE, currentPage})
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USER_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountActionType =>
    ({type: SET_TOTAL_USER_COUNT, count: totalUsersCount})
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType =>({type: TOGGLE_IS_FETCHING, isFetching})
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId:number
}
export const toggleFollowingProgress = (isFetching:boolean, userId:number):ToggleFollowingProgressActionType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const  requestUsers = (page:number, pageSize:number,) => {
   return async (dispatch:any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        // dispatch(SetRandomPlace(contries));
       let data = await usersAPI.getUsers(page, pageSize);
            dispatch(setCurrentPage(page));
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch:any, userId:number, apiMethod:any, actionCreator:any) =>{
    dispatch (toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if  (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));

}
export const  follow = (userId:number) => {
   return async (dispatch:any) => {
       followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSucess);
    }
}
export const  unfollow = (userId:number) => {
   return async (dispatch:any) => {
       followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSucess);
    }
}
type SetRandomPlaceType = {
    type: typeof SET_RANDOM_PLACE
    randomPlace: Array<string>
}
export const SetRandomPlace = (randomPlace:Array<string>):SetRandomPlaceType =>
({type: SET_RANDOM_PLACE, randomPlace})

export default usersReducer;