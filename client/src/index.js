/***************Import External Modules****************** */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


/***************Import Internal Modules****************** */
import App from './containers/app/AppContainer'; 
import store from './store/store';


/*
Create a React DOM 
* Retrieve the div with ID named "root" as the React DOM 
* Provide redux store 
*/
//Search the div with ID Root for REACT components 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);