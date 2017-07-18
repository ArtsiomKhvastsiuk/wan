import './menu.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import * as $ from "jquery";

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

@inject("user") @observer
@inject("menu") @observer
class Menu extends Component {

    isPressed(event) {
        if (event.target.classList.contains('pop-up')) {
            this.props.menu.popUp = event.target.id;
        }
        else {
            event.target.classList.add('active');
            const menuItems = document.querySelectorAll('.menu');
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
                <section className="icon">
                    {
                        this.props.user.isAuthenticated &&
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={this.handleClick.bind(this, "profile")} primaryText="Profile"/>
                            <MenuItem primaryText="Settings"/>
                            <Divider />
                            <MenuItem onClick={this.handleClick.bind(this, "signout")} primaryText="Sign out"/>
                        </IconMenu>

                    }
                </section>
                <header>

                    <Link onClick={this.isPressed.bind(this)} className="menu" to="/weather">weather</Link>
                    <Link onClick={this.isPressed.bind(this)} className="menu" to="/news">news</Link>
                    <Link onClick={this.isPressed.bind(this)} className="menu" to="/about">about</Link>

                    {
                        !this.props.user.isAuthenticated &&
                        <section className="signup-in">
                            <a onClick={this.isPressed.bind(this)} className="menu pop-up" id="signUp">sign up</a>
                            <a onClick={this.isPressed.bind(this)} className="menu pop-up" id="signIn">sign in</a>
                        </section>
                    }


                </header>

            </section>
        )
    }
}

export default Menu;
