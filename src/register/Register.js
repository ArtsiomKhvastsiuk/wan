import React, {Component} from 'react';
import * as $ from 'jquery';
import './register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: true,
            password: true,
            email: true,
        };
    }

    handleFocus(inputName, event) {
        const label = event.target.parentElement;
        label.children[0].src = require("./img/" + inputName + "1" + ".png");
        const labels = document.querySelectorAll('label');
        label.classList.add('active-signup');
        for (let i = 0; i < labels.length; i++) {
            if (label !== labels[i]) {
                labels[i].classList.remove('active-signup');
            }
        }
    };

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
                console.log(res);
                this.username.value = "";
                this.password.value = "";
                this.email.value = "";
            })
            .fail((error) => {
                if (error.responseJSON) {
                    if (error.responseJSON.errno === 2) {
                        alert(error.responseJSON.error);
                        return;
                    }
                    if (error.responseJSON.errno === 3) {
                        alert(error.responseJSON.error);
                        return;
                    }
                    if (error.responseJSON.errno === 4) {
                        alert(error.responseJSON.error);
                        return;
                    }
                }

                self.props.history.push('/error');
            })
    }

    render() {
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;

        return (
            <section className="form">
                <p className="text">Create your account now</p>
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
                    <label>
                        <img src={require("./img/email.png")} alt="email"/>
                        <input type="text" className="" placeholder="Email address"
                               ref={(email) => this.email = email}
                               onChange={this.handleChange.bind(this, 'email')}
                               onFocus={this.handleFocus.bind(this, 'email')}/>
                    </label><br/>
                    <input type="submit" className="button" value="SIGN UP"
                           /*disabled={username || password || email}*//>
                </form>
                <p>Already have an account? <a className="login" href="/signin">Login</a></p>
            </section>
        )
    }
}


export default Register;
