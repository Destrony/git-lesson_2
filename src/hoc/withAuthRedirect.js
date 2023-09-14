import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";


export const withAuthRedirect = (Component) => {
    let mapStateToPropsForRedirect = (state) => ({
        isAuth: state.auth.isAuth
    });
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to = {'/login'}/>

            return <Component {...this.props}/>
        }
    }

   let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent);
    return ConnectedAuthRedirectComponent;
}