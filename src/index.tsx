import reportWebVitals from './reportWebVitals';
import store, {AppStateType} from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SamuraiJSApp from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
 const renderEntireTree: (state: AppStateType)=> void = () => {
      root.render(
            <SamuraiJSApp />
    );
}
renderEntireTree(store.getState());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

