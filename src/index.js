import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.css';
import {observable} from "mobx";

class User {
    @observable isAuthenticated = false;
    @observable alertFlag = false;
}

let user = new User();

ReactDOM.render(<Routes user={user}/>, document.getElementById('root'));
