import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = ({
                     profile,
                     updateStatus,
                     status,
                     isOwner,
                     store,
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
            <MyPostsContainer store={store}/>
        </div>
    )
}
export default Profile;