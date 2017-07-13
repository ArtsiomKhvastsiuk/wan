import React, {Component} from 'react';
import * as $ from 'jquery';
import './register.css';
import {inject} from 'mobx-react'

@inject("user")
class Register extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        $.get('http://localhost:3001/api/check-auth')
            .done((res) => {
                if (res.status) {
                    this.props.user.isAuthenticated = true;
                    this.props.user.alertFlag = true;
                    this.props.history.push('/');
                }
            })
            .fail((error) => {
                this.props.history.push('/error');
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
        $.post("http://localhost:3001/api/signup", {
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
                    this.props.history.push('/profile');
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
                self.props.history.push('/error');
            })
    }

    render() {
        return (
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
            </section>
        )
    }
}


export default Register;
