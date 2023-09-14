import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
const Profile = ({profile, updateStatus, status, store}) => {
    return (
    <div>
        <ProfileInfo profile = {profile} status={status} updateStatus={updateStatus} />
       <MyPostsContainer store = {store} />
      </div>
    )
}
export default Profile;