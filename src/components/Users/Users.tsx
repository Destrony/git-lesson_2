import React, {FC, useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {
    FilterType,
    follow,
    requestUsers,
    unfollow
} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getRandomPlace,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {AppDispatch} from "../../redux/redux-store";
import {useSearchParams} from 'react-router-dom'
type PropsType = {}

export const Users: FC<PropsType> = () => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const filter = useSelector(getUsersFilter);
    const randomPlace = useSelector(getRandomPlace);
    const followingInProgress = useSelector(getFollowingInProgress);
    const dispatch: AppDispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        const result: any = {}
        for (const [key, value] of searchParams.entries()) {
            let value2: any = +value
            if (isNaN(value2)) {
                value2 = value
            }
            if (value === 'true') {
                value2 = true
            } else if (value === 'false') {
                value2 = false
            }
            result[key] = value2
        }
        let actualPage = result.page || currentPage
        let term = result.term || filter.term

        let friend = result.friend || filter.friend
        if (result.friend === false) {
            friend = result.friend
        }
        const actualFilter = {friend, term}
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const term = filter.term
        const friend = filter.friend
        let urlQuery =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)
        setSearchParams(urlQuery)
    }, [filter, currentPage])
        const onPageChanged = (pageNumber: number) => {
            dispatch(requestUsers(pageNumber, pageSize, filter));
        }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    }
    const _follow = (userId:number) => {
dispatch(follow(userId))
    }
        const _unfollow = (userId:number) => {
            dispatch(unfollow(userId))
        }
    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>


            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}/>
            <div>
            {
                users.map(u => <User user={u}
                                     randomPlace={randomPlace}
                                     followingInProgress={followingInProgress}
                                     unfollow={_unfollow}
                                     follow={_follow}
                                     key={u.id}/>)
            }
        </div>
        </div>
    )
}


export default Users;