import React, {Suspense} from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import {
    BrowserRouter, HashRouter, Navigate,
    Route,
    Routes
} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer
    from "./components/Users/UsersContainer";
import HeaderContainer
    from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader
    from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {
    withRouter
} from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
    catchAllUnhandleErrors = (reason, promise) =>{
        alert("Some error occured");
        // console.error(promiseRejectionEvent);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors);
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors);

    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (<div className='app-wrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<div><Preloader /></div>}>
                    <Routes>
                        <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route exact path='/' element={<Navigate to={"/profile"}/>}/>
                        <Route path='*' element={<div>404 NOT FOUND</div>}/>
                    </Routes>
                    </Suspense>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
let AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp;