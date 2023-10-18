import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assects/images/logo.png";
import {NavLink} from "react-router-dom";
import {UsersType} from "../../types/types";

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    follow: (userId:number) => void
    unfollow: (userId:number) => void
    randomPlace: Array<string>
}
let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow, randomPlace}) => {
    const choose = (choices: Array<string>) => {
        const index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }
    // debugger;
    return (
               <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img alt={"face"}
                        src={user.photos.small != null ? user.photos.small : userPhoto}
                        className={styles.userPhoto}/>
                        </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id)
                            }}>
                            UnFollow</button>
                        : <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}>
                            Follow</button>}
                    </div>
            </span>
                    <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>

                <span>
                   <div>{choose(randomPlace)}</div>
                   {/*<div>{choose(randomPlace.city)}</div>*/}
                </span>
            </span>
                </div>
    )
}
export default User;