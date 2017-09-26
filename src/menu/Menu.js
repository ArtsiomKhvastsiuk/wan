import './menu.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import * as $ from "jquery";
import MenuIcon from './MenuIcon'
import { withRouter } from 'react-router-dom';

import DropDown from '../menu/DropDown';

@inject("user") @observer
@inject("menu", "weather") @observer
class Menu extends Component {

    constructor(props) {
        super(props);
        this.isPressed = this.isPressed.bind(this);
    }

    isPressed(event) {
        if (event.target.classList.contains('pop-up')) {
            this.props.menu.popUp = event.target.id;
        }
        else {
            if (event.target !== $('#logo'))
                event.target.classList.add('active');
            const menuItems = document.querySelectorAll('header a');
            for (let i = 0; i < menuItems.length; i++) {
                if (menuItems[i] !== event.target) {
                    menuItems[i].classList.remove('active');
                }
            }
        }
    }

    handleClick(value, event) {
        if (value === "signout")
            $.get("http://localhost:3001/api/logout")
                .done((res) => {
                    this.props.user.isAuthenticated = false;
                    this.props.history.push("/");
                })
                .fail((error) => {

                });
        if (value === "profile") {
            this.props.history.push("/profile");
        }
    }

    render() {
        return (
            <section>
                <header>
                    <section className="logo">
                        <Link id="logo" onClick={this.isPressed} to="/">WN</Link>
                    </section>
                    <section className="menu">
                        {this.props.weather.isWeather && <DropDown /> }
                        <nav>
                            <Link onClick={this.isPressed} to="/weather">weather</Link>
                            <Link onClick={this.isPressed} to="/news">news</Link>
                            <Link onClick={this.isPressed} to="/about">about</Link>
                        </nav>

                        {
                            !this.props.user.isAuthenticated &&
                            <section>
                                <a onClick={this.isPressed} className="pop-up" id="signUp">sign up</a>
                                <a onClick={this.isPressed} className="pop-up" id="signIn">sign in</a>
                            </section>
                        }
                        { this.props.user.isAuthenticated && <MenuIcon class="menu-icon"/> }

                    </section>
                </header>
            </section>
        )
    }
}

export default withRouter(Menu);
