import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const Profile: React.FC<PropsType> = ({
                     profile,
                     updateStatus,
                     status,
                     isOwner,
                     savePhoto,
                     saveProfile
                 }) => {
    return (
        <div>
            <ProfileInfo savePhoto={savePhoto}
                         isOwner={isOwner} profile={profile}
                         status={status}
                         saveProfile={saveProfile}
                         updateStatus={updateStatus}/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;