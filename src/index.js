import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.css';
import {observable} from "mobx";

class User {
    @observable isAuthenticated = false;
}

let user = new User();

ReactDOM.render(<Routes user={user}/>, document.getElementById('root'));
