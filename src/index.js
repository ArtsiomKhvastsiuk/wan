import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.css';
import {observable} from "mobx";

class User {
    @observable isAuthenticated = false;
    @observable alertFlag = false;
    @observable city = null;
}

class Weather {
    @observable data = {
        country: null,
    }
}

let user = new User();

ReactDOM.render(<Routes user={user}/>, document.getElementById('root'));
