import './menu.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import * as $ from "jquery";

import DropDown from '../menu/DropDown';

@inject("user") @observer
@inject("menu", "weather") @observer
class Menu extends Component {

    isPressed(event) {
        if (event.target.classList.contains('pop-up')) {
            this.props.menu.popUp = event.target.id;
        }
        else {
            event.target.classList.add('active');
            const menuItems = document.querySelectorAll('.menu a');
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
                    window.location = "http://localhost:3001/";
                })
                .fail((error) => {

                })
        if (value === "profile") {
            window.location = "http://localhost:3001/profile";
        }
    }

    render() {
        return (
            <section>
                <header>
                    <section className="logo">
                        <a href="/">WN</a>
                    </section>
                    <section className="menu">
                        {this.props.weather.isWeather && <DropDown /> }
                        <nav>
                            <Link onClick={this.isPressed.bind(this)} to="/weather">weather</Link>
                            <Link onClick={this.isPressed.bind(this)} to="/news">news</Link>
                            <Link onClick={this.isPressed.bind(this)} to="/about">about</Link>
                        </nav>

                        {
                            !this.props.user.isAuthenticated &&
                            <section>
                                <a onClick={this.isPressed.bind(this)} className="pop-up" id="signUp">sign up</a>
                                <a onClick={this.isPressed.bind(this)} className="pop-up" id="signIn">sign in</a>
                            </section>
                        }
                    </section>
                </header>
            </section>
        )
    }
}

export default Menu;
