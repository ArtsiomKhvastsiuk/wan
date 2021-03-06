import React from "react";
import * as $ from 'jquery'
import Auth from '../authentication/Auth.js';
import Register from '../register/Register.js';
import {inject, observer} from 'mobx-react';

@inject ("user", "menu", "weather") @observer
class About extends React.Component {

    componentWillMount() {
        if (!this.props.user.isAuthenticated) {
            $.get("http://localhost:3001/api/check-auth")
                .done((res) => {
                    if (res.status) {
                        this.props.user.isAuthenticated = true;
                        return;
                    }
                    this.props.user.isAuthenticated = false;
                })
                .fail((error) => {
                    this.props.history.push('/error');
                })
        }
    }

    componentDidMount() {
        const menuItems = document.querySelectorAll('.menu a');
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].innerHTML === 'about')
                menuItems[i].classList.add('active');
        }

        this.props.weather.isWeather = false;
    }

    render() {
        return (
            <section>
                { this.props.menu.popUp==='signIn' && <Auth />}
                { this.props.menu.popUp==='signUp' && <Register />}
            </section>
        )
    }
}

export default About;
