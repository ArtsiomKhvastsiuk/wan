import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.css';
import {observable} from "mobx";

class User {

    @observable isAuthenticated = false;
    @observable alertFlag = false;
    @observable username = null;
    @observable email = null;
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

class Menu{
    @observable popUp = '';
}

let weather = new Weather();

let menu = new Menu();

let user = new User();

ReactDOM.render(<Routes user={user} weather={weather} menu={menu}/>, document.getElementById('root'));
