import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
// import IntrinsicAttributes = React.JSX.IntrinsicAttributes;

type mapStateToPropsForRedirectPropsType = {
    isAuth: boolean | null
}
let mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsForRedirectPropsType => {
    return {
        isAuth: state.auth.isAuth,
    };
};


export function withAuthRedirect(Component: React.ComponentType<mapStateToPropsForRedirectPropsType>) {
    class RedirectComponent extends React.Component<mapStateToPropsForRedirectPropsType> {
        render() {
            if (!this.props.isAuth) return <Navigate to={"/login"} />;
            return <Component {...this.props} />;
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
        RedirectComponent
    );
    return ConnectedAuthRedirectComponent;
}