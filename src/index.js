import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.css';
import {observable} from "mobx";

class User {
    @observable isAuthenticated = false;
    @observable alertFlag = false;
}

class Weather {
    @observable data = {
        country: null,
        city: null,
        temp: null,
        isMounted: false,
        refresh: true,
        date: new Date().toLocaleString()
    }
}

let weather = new Weather();

let user = new User();

ReactDOM.render(<Routes user={user} weather={weather}/>, document.getElementById('root'));
