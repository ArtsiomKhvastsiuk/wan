import React, {Component} from 'react';
import * as $ from 'jquery';
import './auth.css';
import {inject, observer} from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject("user")
    @inject("menu") @observer
class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: true,
            password: true,
        };
    }

    handleFocus(inputName, event) {
        const label = event.target.parentElement;
        label.children[0].src = require("./img/" + inputName + "1" + ".png");
    };

    handleBlur(inputName, event){
        const label = event.target.parentElement;
        label.children[0].src = require("./img/" + inputName + ".png");
    }

    close(){
        this.props.menu.popUp = '';
    }

    handleChange(inputName, event) {

    }

    handleSubmit(event) {
        event.preventDefault();
        $.post("http://localhost:3001/api/signin", {
            username: this.username.value,
            password: this.password.value,
        })
            .done((res) => {
                if (res.result) {
                    this.username.value = "";
                    this.password.value = "";
                    this.props.user.isAuthenticated = true;
                    window.location = 'http://localhost:3001/';
                    return;
                } else if (res.errno === 2) {
                    alert("Incorrect username");
                    return;
                } else if (res.errno === 3)  {
                    alert("Incorrect password");
                    return;
                }

                alert("Missing credentials");
            })
            .fail((error) => {
                this.props.history.push('/error');
            })
    }

    render() {
        return (
            <section>
                <section className="overlay" onClick={this.close.bind(this)}> </section>
                            <section className="auth-form-container">
                                <p className="text">Please sign in</p>
                                <form className="auth-form" onSubmit={this.handleSubmit.bind(this)}>
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
                                    <input  type="submit" className="button" value="SIGN IN" />
                                </form>
                                <a className="google-auth" href="api/auth/google">
                                    Sign In with Google
                                    <img src={require('./img/google1.png')} alt="google"/>
                                </a>

                            </section>

            </section>
        )
    }
}

export default withRouter(Authentication);

