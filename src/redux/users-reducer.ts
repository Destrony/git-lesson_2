import {APIResponseType, ResultCodesEnum} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UsersType} from '../types/types';
import {
    BaseThunkType,
    InferActionsTypes
} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";


let initialState = {
    randomPlace: [
        "Австралия", "Австрия", "Азербайджан", "Албания", "Алжир",
        "Ангола", "Андорра", "Антигуа", "Барбуда", "Аргентина", "Армения",
        "Афганистан", "Багамские", "Острова", "Бангладеш", "Барбадос", " Бахрейн", " Белиз",
        " Белоруссия", " Бельгия", " Бенин", " Болгария", " Боливия", " Босния и Герцеговина", "Ботсвана"],
    // cities: [
    //     "Абаза", "Абакан", "Абдулино", "Абинск",
    //     "Агидель", "Агрыз", "Адыгейск", "Азнакаево", "Азов", "Ак-Довурак", "Аксай",
    //     "Алагир", "Алапаевск", "Алатырь", "Алдан", "Алейск", "Александров", "Александровск",
    //     "Александровск-Сахалинский", "Алексеевка", "Алексин", "Алзамай", "Алупка", "Алушта",
    //     "Альметьевск", "Амурск", "Анадырь", "Анапа", "Ангарск", "Андреаполь", "Анжеро-Судженск",
    //     "Анива", "Апатиты", "Апрелевка", "Апшеронск", "Арамиль", "Аргун", "Ардатов", "Ардон", "Арзамас",
    //     "Аркадак", "Армавир", "Армянск", "Арсеньев"]
    //     as Array<string>,],
    users: [] as Array<UsersType>,
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of user id
    filter: {
        term: '',
        friend: null as null | boolean
    }
};
const usersReducer = (state = initialState, action: ActionsTypes)
    : InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SN/USERS/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SN/USERS/SET_TOTAL_USER_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case 'SN/USERS/SET_FILTER': {
            return {...state, filter: action.payload}
        }
        case 'SN/USERS/SET_RANDOM_PLACE': {
            return {
                ...state,
                randomPlace: action.randomPlace
            }
        }
        default:
            return state;
    }
}
export const actions = {
    followSuccess: (userId: number) => ({
        type: 'SN/USERS/FOLLOW',
        userId
    } as const),
    unfollowSuccess: (userId: number) => ({
        type: 'SN/USERS/UNFOLLOW',
        userId
    } as const),
    setUsers: (users: Array<UsersType>) => ({
        type: 'SN/USERS/SET_USERS',
        users
    } as const),
    setCurrentPage: (currentPage: number) =>
        ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER',payload: filter} as const),
    setTotalUsersCount: (totalUsersCount: number) =>
        ({type: 'SN/USERS/SET_TOTAL_USER_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
     SetRandomPlace: (randomPlace: Array<string>) =>
        ({type: 'SN/USERS/SET_RANDOM_PLACE', randomPlace} as const)

}

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))
        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

const _followUnfollowFlow =
    async (dispatch: Dispatch<ActionsTypes>, userId: number,
           apiMethod: (userId: number) => Promise<APIResponseType>,
           actionCreator: (userId:number) =>
            ActionsTypes) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let response = await apiMethod(userId);
        if (response.resultCode == ResultCodesEnum.Success) {
            dispatch(actionCreator(userId));
        }
        dispatch(actions.toggleFollowingProgress(false, userId));

    }
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI),
            actions.unfollowSuccess);
    }
}
export default usersReducer;
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>
