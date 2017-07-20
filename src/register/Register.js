import React, {Component} from 'react';
import * as $ from 'jquery';
import './register.css';
import {inject, observer} from 'mobx-react'

import Popover from './Popover';
import * as validator from './helpers/validator';

@inject("user")
@inject("menu", "form") @observer
class Register extends Component {

    componentWillMount() {
        $.get('http://localhost:3001/api/check-auth')
            .done((res) => {
                if (res.status) {
                    this.props.user.isAuthenticated = true;
                    this.props.user.alertFlag = true;
                    window.location = "http://localhost:3001";
                }
            })
            .fail((error) => {
                window.location = "http://localhost:3001/error";
            })
    }

    checkInputUsername() {
        const username = $("#inputUsername").val();
        if (username.length > 0) {
            const result = validator.usernameValidator(username);
            if (result === true) {
                validator.checkUsername(username, (result) => {
                    if (result === true) {
                        this.props.form.text = "You can use this username.";
                        this.props.form.username = 1;
                    } else if (result === false) {
                        // warning
                        this.props.form.text = "This username is already used.";
                        this.props.form.username = -1;
                    } else {
                        // warning
                        this.props.form.text = "Username verification failed."
                        this.props.form.username = -1;
                    }
                })
            } else {
                // warning
                this.props.form.text = result;
                this.props.form.username = -1;
            }
        } else {
            this.props.form.username = 0;
        }
    }

    checkInputPassword () {
        const password = $("#inputPassword").val();
        if (password.length > 0) {
            const result = validator.passwordValidator(password);
            if (result === true) {
                this.props.form.text = 'You can use this password'
                this.props.form.password = 1;
            } else {
                this.props.form.text = result;
                this.props.form.password = -1;
            }
        } else {
            this.props.form.password = 0;
        }
    }

    checkInputEmail() {
        const email = $("#inputEmail").val();
        if (email.length > 0) {
            const result = validator.emailValidator(email);
            if (result === true) {
                this.props.form.text = "It's okey";
                this.props.form.email = 1;
            } else {
                this.props.form.text = result;
                this.props.form.email = -1;
            }
        } else {
            this.props.form.email = 0;
        }
    }


    close() {
        this.props.menu.popUp = '';
    }

    componentWillUnmount() {
        this.props.menu.popUp = '';
    }

    handleChange(inputName, event) {
        if (inputName === "username") {
            this.checkInputUsername();
        }

        if (inputName === "password") {
            this.checkInputPassword();
        }

        if (inputName === "email") {
            this.checkInputEmail();
        }
    }


    handleFocus(inputName, event) {
        this.handleChange(inputName, event);
        const label = event.target.parentElement;
        label.children[0].src = require("./img/" + inputName + "1" + ".png");
        label.classList.add('label-active');
    };

    handleBlur(inputName, event) {
        const label = event.target.parentElement;
        label.classList.remove('label-active');
        label.children[0].src = require("./img/" + inputName + ".png");
        this.props.form.username = 0;
        this.props.form.password = 0;
        this.props.form.email = 0;
    }


    handleSubmit(event) {
        event.preventDefault();
        $.post("http://localhost:3001/api/signup", {
            username: this.username.value,
            password: this.password.value,
            email: this.email.value
        })
            .done((res) => {
                if (res.errno === 1) {
                    $("#inputUsername").focus();
                    return;
                }
                if (res.errno === 2) {
                    $("#inputUsername").focus();
                    return;
                }
                if (res.errno === 3) {
                    $("#inputPassword").focus();
                    return;
                }
                if (res.errno === 4) {
                    $("#inputEmail").focus();
                    return;
                }

                if (res.result) {
                    this.username.value = "";
                    this.password.value = "";
                    this.email.value = "";
                    this.props.user.isAuthenticated = true;
                    window.location = "http://localhost:3001/profile";
                    alert("You've successfully registered");
                    return;
                }

                // required parameters are missing
                alert(res.message);

            })
            .fail((error) => {
                console.log(error);
                window.location = "http://localhost:3001/error";
            })
    }


    render() {
        return (
            <section>
                <section className="overlay" onClick={this.close.bind(this)}></section>
                <section className="reg-form-container">
                    <img src={require("./img/registerPic.png")} alt="1" id="regPic"/>
                    <section className="form">
                        <p className="text">Create your account now</p>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <label>
                                { this.props.form.username === 1 && <Popover className="ok"/> }
                                { this.props.form.username === -1 && <Popover className="warning"/> }
                                <img src={
                                    (this.props.form.username === 0 && require("./img/username.png")) ||
                                    (this.props.form.username === -1 && require("./img/username2.png")) ||
                                    (this.props.form.username === 1 && require("./img/username3.png"))
                                } alt="username"
                                />
                                <input id="inputUsername" type="text" className="" placeholder="Login"
                                       ref={(username) => this.username = username}
                                       onChange={this.handleChange.bind(this, 'username')}
                                       onFocus={this.handleFocus.bind(this, 'username')}
                                       onBlur={this.handleBlur.bind(this, 'username')}/>
                            </label><br/>
                            <label>
                                { this.props.form.password === 1 && <Popover className="ok"/> }
                                { this.props.form.password === -1 && <Popover className="warning"/> }
                                <img src={
                                    (this.props.form.password === 0 && require("./img/password.png")) ||
                                    (this.props.form.password === -1 && require("./img/password2.png")) ||
                                    (this.props.form.password === 1 && require("./img/password3.png"))
                                } alt="login"
                                />
                                <input id="inputPassword" type="password" className="" placeholder="Password"
                                       ref={(password) => this.password = password}
                                       onChange={this.handleChange.bind(this, 'password')}
                                       onFocus={this.handleFocus.bind(this, 'password')}
                                       onBlur={this.handleBlur.bind(this, 'password')}/>
                            </label><br/>
                            <label>
                                { this.props.form.email === 1 && <Popover className="ok"/> }
                                { this.props.form.email === -1 && <Popover className="warning"/> }
                                <img src={
                                    (this.props.form.email === 0 && require("./img/email.png")) ||
                                    (this.props.form.email === -1 && require("./img/email2.png")) ||
                                    (this.props.form.email === 1 && require("./img/email3.png"))
                                } alt="login"
                                />
                                <input id="inputEmail" type="text" className="" placeholder="Email address"
                                       ref={(email) => this.email = email}
                                       onChange={this.handleChange.bind(this, 'email')}
                                       onFocus={this.handleFocus.bind(this, 'email')}
                                       onBlur={this.handleBlur.bind(this, 'email')}/>
                            </label><br/>
                            <input type="submit" className="button" value="SIGN UP"/>
                        </form>
                        <p>Already have an account? <a className="login" href="/signin">Login</a></p>
                        <a href="api/auth/google">Sign In with Google</a>
                    </section>
                </section>
            </section>
        )
    }
}


export default Register;
