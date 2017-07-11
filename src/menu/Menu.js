import './menu.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@inject("user") @observer
class Menu extends Component {

    isPressed(event) {
        const menuItems = document.querySelectorAll('.menu');
        for (let i = 0; i < menuItems.length; i++) {
            if (event.target === menuItems[i]) {
                menuItems[i].classList.add('active');
            } else menuItems[i].classList.remove('active');
        }
    }

    render() {
        return (
            <header>
                <Link onClick={this.isPressed.bind(this)} className="menu" to="/weather">weather</Link>
                <Link onClick={this.isPressed.bind(this)} className="menu" to="/news">news</Link>
                <Link onClick={this.isPressed.bind(this)} className="menu" to="/about">about</Link>
                {
                    !this.props.user.isAuthenticated &&
                        <section className="signup-in">
                            <Link onClick={this.isPressed.bind(this)} className="menu" to="/signup">sign up</Link>
                            <Link onClick={this.isPressed.bind(this)} className="menu" to="/signin">sign in</Link>
                        </section>
                }

                {
                    this.props.user.isAuthenticated &&
                    <Link onClick={this.isPressed.bind(this)} className="menu" to="/profile">
                        <img className="profile-img" src={require("./img/profile2.png")} alt="password"/>
                    </Link>
                }

            </header>
        )
    }
}

export default Menu;
