import React, {Suspense} from 'react';
import './App.css';
import {
    HashRouter,
    Link,
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader
    from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {
    withRouter
} from "./components/Profile/ProfileContainer";
import {UsersPage} from "./components/Users/UsersContainer";
import {LoginPage} from "./components/Login/LoginPage";
import type {MenuProps} from 'antd';
import {Breadcrumb, Button, Layout, Menu} from "antd";
import './index.css';
import {
    LaptopOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import {HeaderComponent} from "./components/Header/Header";

const DialogsContainer = React.lazy(() =>
    import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() =>
    import('./components/Profile/ProfileContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = { initializeApp: () => void }


//region antd
const {Content, Footer,
    Sider} = Layout

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(label: React.ReactNode,
                        key?: React.Key | null,
                        icon?: React.ReactNode,
                        children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}


const itemsSideMenu: MenuItem[] = [

    getItem('My Profile', 'MyProfile', <UserOutlined />, [
        getItem(
            <Link to='/profile'>
                Profile
            </Link>,
            'Profile'),
        getItem(
            <Link to='/dialogs'>
                Messages
            </Link>,
            'Messages'),
        getItem(
            <Link to='/users'>
                Users
            </Link>,
            'Users')
    ]),

    getItem('Developers', 'Developers', <LaptopOutlined />, [
        getItem(
            <Link to='/info'>
                Info
            </Link>,
            'DevelopersList'),
        getItem(
            <Link to='/chat'>
                Developers chat
            </Link>,
            'DevelopersChat')
    ]),

    getItem('Settings', 'Settings', <SettingOutlined />, [
        getItem(
            <Link to='/settings'>
                Settings
            </Link>,
            'News'),
        getItem(
            <Link to='/music'>
                Music
            </Link>,
            'Music')
    ])
]

class App extends React.Component<MapPropsType & DispatchPropsType> {

    //region componentDid...
    catchAllUnhandledErrors = (
        promiseRejectionEvent: PromiseRejectionEvent) => {
        console.log('Some error')
        console.log(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection',
            this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection',
            this.catchAllUnhandledErrors)
    }

    //endregion

    render() {
        if (!this.props.initialized) {
            return (
                <div className='app-wrapper '>
                    <Preloader />
                    <Music />
                </div>)
        }

        return (
            <Layout>
                <HeaderComponent/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>
                            <Link to='/'>
                                Home
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='/developers'>
                                List
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className='app-wrapper-content ' style={{padding: '24px 0'}}>
                        <Sider className='site-layout-background' width={200}>
                            <Menu mode='inline' style={{height: '100%'}} items={itemsSideMenu} />
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Suspense fallback={<div><Preloader /></div>}>
                                <Routes>
                                <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                                <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                                <Route path='/users' element={<UsersPage pageTitle={"People"}/>}/>
                                <Route path='/music' element={<Music/>}/>
                                <Route path='/settings' element={<Settings/>}/>
                                <Route path='/login' element={<LoginPage/>}/>
                                <Route path='/' element={<Navigate to={"/profile"}/>}/>
                                <Route path='*' element={<div>404 NOT FOUND
                                    <Button type={"primary"}>OK</Button>
                                </div>}/>
                            </Routes>
                            </Suspense>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center', marginBottom: '10px'}}>
                    <div className='created-by'>
                        Social Network ©2022 Created by <a href={`http://localhost:3000`}
                        target='_blank' rel='noopener noreferrer'
                            className='pad-left-10px'>Sednev Kirill</a>
                        <span className='pad-left-10px'> | </span>
                        <a href={`#`} target='_blank' rel='noopener noreferrer'
                           className='pad-left-10px'>GitHub</a>
                    </div>
                </Footer>
            </Layout>
        )
    }
}

// class App extends Component<MapsPropsType & DispatchPropsType > {
//     // catchAllUnhandledErrors = (e: PromiseRejectionEvent) =>{
//     //     alert("Some error occurred");
//     // }
//     componentDidMount() {
//         this.props.initializeApp();
//     }
//     render() {
//         if (!this.props.initialized) {
//             return <Preloader/>
//         }
//
//        return <Layout>
//             <Header style={{ display: 'flex', alignItems: 'center' }}>
//                 <div className="demo-logo" />
//                 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
//             </Header>
//             <Content style={{ padding: '0 50px' }}>
//                 <Breadcrumb style={{ margin: '16px 0' }}>
//                     <Breadcrumb.Item>Home</Breadcrumb.Item>
//                     <Breadcrumb.Item>List</Breadcrumb.Item>
//                     <Breadcrumb.Item>App</Breadcrumb.Item>
//                 </Breadcrumb>
//                 <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
//                     <Sider style={{ background: colorBgContainer }} width={200}>
//                         <Menu
//                             mode="inline"
//                             defaultSelectedKeys={['1']}
//                             defaultOpenKeys={['sub1']}
//                             style={{ height: '100%' }}
//                             items={items2}
//                         />
//                     </Sider>
//                     <Content style={{ padding: '0 24px', minHeight: 280 }}>
//                         <Suspense fallback={<div><Preloader /></div>}>
//                             <Routes>
//                                 <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
//                                 <Route path='/dialogs/*' element={<DialogsContainer/>}/>
//                                 <Route path='/users' element={<UsersPage pageTitle={"People"}/>}/>
//                                 <Route path='/music' element={<Music/>}/>
//                                 <Route path='/settings' element={<Settings/>}/>
//                                 <Route path='/login' element={<LoginPage/>}/>
//                                 <Route path='/' element={<Navigate to={"/profile"}/>}/>
//                                 <Route path='*' element={<div>404 NOT FOUND
//                                     <Button type={"primary"}>OK</Button>
//                                 </div>}/>
//                             </Routes>
//                         </Suspense>
//                     </Content>
//                 </Layout>
//             </Content>
//             <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
//         </Layout>
//         // return (<div className='app-wrapper'>
//         //         <HeaderContainer/>
//         //         <NavBar/>
//         //         <div className='app-wrapper-content'>
//         //             <Suspense fallback={<div><Preloader /></div>}>
//         //             <Routes>
//         //                 <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
//         //                 <Route path='/dialogs/*' element={<DialogsContainer/>}/>
//         //                 <Route path='/users' element={<UsersPage pageTitle={"People"}/>}/>
//         //                 <Route path='/music' element={<Music/>}/>
//         //                 <Route path='/settings' element={<Settings/>}/>
//         //                 <Route path='/login' element={<LoginPage/>}/>
//         //                 <Route path='/' element={<Navigate to={"/profile"}/>}/>
//         //                 <Route path='*' element={<div>404 NOT FOUND
//         //                  <Button type={"primary"}>OK</Button>
//         //                 </div>}/>
//         //             </Routes>
//         //             </Suspense>
//         //         </div>
//         //     </div>)
//     }
// }

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
let AppContainer = compose<React.ComponentType>
(withRouter, connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp;