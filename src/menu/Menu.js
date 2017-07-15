import './menu.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@inject("user") @observer
@inject("menu") @observer
class Menu extends Component {

    isPressed(event) {
        if (event.target.classList.contains('pop-up')){
            this.props.menu.popUp = event.target.id;
        }
        else {
            event.target.classList.add('active');
            const menuItems = document.querySelectorAll('.menu');
            for (let i=0; i<menuItems.length; i++){
                if (menuItems[i]!==event.target){
                    menuItems[i].classList.remove('active');
                }
            }
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
                            <a onClick={this.isPressed.bind(this)} className="menu pop-up" id="signUp">sign up</a>
                            <a onClick={this.isPressed.bind(this)} className="menu pop-up" id="signIn">sign in</a>
                        </section>
                }

                {
                    this.props.user.isAuthenticated &&
                        <section className="signup-in">
                            <Link onClick={this.isPressed.bind(this)} className="menu" to="/profile">
                                <img className="profile-img" src={require("./img/profile2.png")} alt="password"/>
                            </Link>
                        </section>
                }

            </header>
        )
    }
}

export default Menu;
