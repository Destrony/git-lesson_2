import React from 'react';
import pro from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks
    from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div>
    <div className={pro.description}>
        <img src = {profile.photos.large} />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
    </div>
    </div>

    )

}

export default ProfileInfo;