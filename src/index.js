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

class Form {
    @observable username = 0;
    @observable password = 0;
    @observable email = 0;
    @observable text = "";
}

let weather = new Weather();

let menu = new Menu();

let user = new User();

let form = new Form();

ReactDOM.render(<Routes user={user} weather={weather} menu={menu} form={form} />, document.getElementById('root'));
