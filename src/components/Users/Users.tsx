import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
// @ts-ignore
import User from "./User";
import {UsersType} from "../../types/types";


type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber:number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    follow: (userId:number) => void
    unfollow: (userId:number) => void
    randomPlace: Array<string>
}
let Users: FC<PropsType> = ({
                 currentPage,
                 totalUsersCount,
                 pageSize,
                 onPageChanged,
                 users,
                 ...props
             }) => {
    return (
        <div>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}/>
            <div>
            {
                users.map(u => <User user={u}
                                     randomPlace={props.randomPlace}
                                     followingInProgress={props.followingInProgress}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                                     key={u.id}/>)
            }
        </div>
        </div>
    )
}
export default Users;