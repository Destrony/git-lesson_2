import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    requestUsers,
    unfollow
} from '../../redux/users-reducer';
import Users from './Users';
// @ts-ignore
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getRandomPlace,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";
import {UsersType} from "../../types/types";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UsersType>
    followingInProgress: Array<number>
    randomPlace: Array<string>
}
type MapDispatchPropsType = {
    follow: (userId:number) => void
    unfollow: (userId:number) => void
    getUsers: (currentPage:number, pageSize:number ) => void
}
type OwnPropsType = {
    pageTitle:string
}

 type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber:number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                randomPlace={this.props.randomPlace}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        randomPlace: getRandomPlace(state)
    };
}
export default compose(
    connect<MapStatePropsType,MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        getUsers: requestUsers,
    }))(UsersContainer)