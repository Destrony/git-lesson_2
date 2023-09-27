import React from "react";
import styles from "./Users.module.css";
import userPhoto
    from "../../assects/images/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png";
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow, randomPlace}) => {
    const choose = (choices) => {
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