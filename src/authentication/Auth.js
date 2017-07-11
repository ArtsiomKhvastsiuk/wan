import React, {Component} from 'react';
import * as $ from 'jquery';
import './auth.css';
import {inject, observer} from 'mobx-react';

@inject("user") @observer
class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: true,
            password: true,
        };
    }

/*    componentWillMount() {
        $.get("http://localhost:3001/api/check-auth")
            .done((res) => {
                console.log(res);
            })
            .fail((error) => {
                console.log(error);
            })
    }*/

    handleFocus(inputName, event) {

    };

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
                    this.props.history.push('/');
                }

            })
            .fail((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <section className="form">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        <img src={require("./img/login.png")} alt="login"/>
                        <input type="text" className="" placeholder="Login"
                               ref={(username) => this.username = username}
                               onChange={this.handleChange.bind(this, 'username')}
                               onFocus={this.handleFocus.bind(this, 'login')}/>
                    </label><br/>
                    <label>
                        <img src={require("./img/password.png")} alt="password"/>
                        <input type="password" className="" placeholder="Password"
                               ref={(password) => this.password = password}
                               onChange={this.handleChange.bind(this, 'password')}
                               onFocus={this.handleFocus.bind(this, 'password')}/>
                    </label><br/>
                    <input  type="submit" className="button" value="SIGN IN" />
                </form>
            </section>
        )
    }
}

export default Authentication;

