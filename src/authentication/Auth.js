import React, {Component} from 'react';
import * as $ from 'jquery';
import './auth.css';
import {inject, observer} from 'mobx-react';

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

    componentWillMount() {
        $.get('/api/check-auth')
            .done((res) => {
                if (res.status) {
                    this.props.user.isAuthenticated = true;
                    this.props.user.alertFlag = true;
                    window.location = "http://localhost:3000";
                }
            })
            .fail((error) => {
                window.location = "http://localhost:3000/error";
            })
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
        $.post("/api/signin", {
            username: this.username.value,
            password: this.password.value,
        })
            .done((res) => {
                if (res.result) {
                    this.username.value = "";
                    this.password.value = "";
                    this.props.user.isAuthenticated = true;
                    window.location = "http://localhost:3000";
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
                window.location = "http://localhost:3000/error";
            })
    }

    render() {
        return (
            <section>
                <section className="overlay" onClick={this.close.bind(this)}> </section>
                            <section className="auth-form-container">
                                <p className="text">Please sign in</p>
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
                                    <input  type="submit" className="button" value="SIGN IN" />
                                </form>
                            </section>

            </section>
        )
    }
}

export default Authentication;

