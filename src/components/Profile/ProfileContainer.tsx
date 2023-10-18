import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {
    NavigateFunction,
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom';
import {compose} from "redux";
import {LoginPage} from "../Login/LoginPage";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type withRouterProps = {
    router: {
        location: Location;
        navigate: NavigateFunction;
        params: Record<string, string>;
    };
}
export function withRouter<WCP extends object> (Component: React.ComponentType<WCP>) {
    return (props: WCP) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props} router={{ location, navigate, params }} />
        );
    }
}
type MapPropsType = ReturnType<typeof  mapStateToProps>
type MapDispatchType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PropsType = MapPropsType & MapDispatchType & withRouterProps
function refreshProfile(props: PropsType){
    let userId: number | null = +props.router.params.userId;
    if (!userId) {
        userId = props.authorizedUserId;
        if (!userId) {
            props.router.navigate('/login');
        }
    }
    if (!userId) {
        console.error("ID should exist in URI params or in state ('authorizedUserId')")
    } else {
        props.getUserProfile(userId);
        props.getStatus(userId);
    }
}
const ProfileContainer: React.FC<PropsType>  = (props) => {

    // @ts-ignore
    useEffect(() => {
        refreshProfile(props);
        if (props.router.params.userId != props.router.params.userId) {
            refreshProfile(props);
        }
    },[]);
    if (!props.authorizedUserId && !props.router.params.userId) {
        return <LoginPage/>
    }
        return (
            <Profile {...props}
                     saveProfile={props.saveProfile}
                     isOwner={!props.router.params.userId}
                     profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     savePhoto={props.savePhoto}/>

        )

}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});
export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile
    }),
    withRouter
)(ProfileContainer);


