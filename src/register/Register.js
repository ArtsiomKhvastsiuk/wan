import React, {Component} from 'react';
import * as $ from 'jquery';
import './register.css';
import {inject, observer} from 'mobx-react'

@inject("user")
@inject("menu") @observer
class Register extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        $.get('/api/check-auth')
            .done((res) => {
                if (res.status) {
                    this.props.user.isAuthenticated = true;
                    this.props.user.alertFlag = true;
                    window.location = "/";
                }
            })
            .fail((error) => {
                window.location = "/error";
            })
    }

    close() {
        this.props.menu.popUp = '';
    }

    componentWillUnmount() {
        this.props.menu.popUp = '';
    }

    componentDidMount() {
        console.log(this.props.location);
    }

    handleFocus(inputName, event) {
        const label = event.target.parentElement;
        label.children[0].src = require("./img/" + inputName + "1" + ".png");
        label.classList.add('label-active');

    };

    handleBlur(inputName, event) {
        const label = event.target.parentElement;
        label.children[0].src = require("./img/" + inputName + ".png");
        label.classList.remove('label-active');
    }

    handleChange(inputName, event) {
        if (event.target.value.trim().length > 0) {
            this.setState({
                [inputName]: false
            });
        } else {
            this.setState({
                [inputName]: true
            });
        }
    }

    handleSubmit(event) {
        const self = this;
        event.preventDefault();
        $.post("/api/signup", {
            username: this.username.value,
            password: this.password.value,
            email: this.email.value
        })
            .done((res) => {
                // login already exists
                if (res.errno === 1) {
                    alert(res.message);
                    return;
                }

                if (res.result) {
                    this.username.value = "";
                    this.password.value = "";
                    this.email.value = "";
                    this.props.user.isAuthenticated = true;
                    window.location = "/profile";
                    alert("You've successfully registered");
                    return;
                }

                // required parameters are missing
                alert(res.message);

            })
            .fail((error) => {
                //validation errors
                if (error.responseJSON) {
                    // username
                    if (error.responseJSON.errno === 2) {
                        alert(error.responseJSON.error);
                        return;
                    }
                    // password
                    if (error.responseJSON.errno === 3) {
                        alert(error.responseJSON.error);
                        return;
                    }
                    // email
                    if (error.responseJSON.errno === 4) {
                        alert(error.responseJSON.error);
                        return;
                    }
                }


                // critical error
                //self.props.history.push('/error');
                window.location = "/error";
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
                                <img src={require("./img/login.png")} alt="login"/>
                                <input type="text" className="" placeholder="Login"
                                       ref={(username) => this.username = username}
                                       onChange={this.handleChange.bind(this, 'username')}
                                       onFocus={this.handleFocus.bind(this, 'login')}
                                       onBlur={this.handleBlur.bind(this, 'login')}/>
                            </label><br/>
                            <label>
                                <img src={require("./img/password.png")} alt="password"/>
                                <input type="password" className="" placeholder="Password"
                                       ref={(password) => this.password = password}
                                       onChange={this.handleChange.bind(this, 'password')}
                                       onFocus={this.handleFocus.bind(this, 'password')}
                                       onBlur={this.handleBlur.bind(this, 'password')}/>
                            </label><br/>
                            <label>
                                <img src={require("./img/email.png")} alt="email"/>
                                <input type="text" className="" placeholder="Email address"
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
