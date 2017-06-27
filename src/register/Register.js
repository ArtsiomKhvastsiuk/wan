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

    handleFocus(event) {
        event.target.style.border = "0px";
        const header = document.getElementsByTagName('header');
        const children = header[0].children;
        for (let i = 0; i < children.length; i++) {
            if (event.target === children[i]) {
                children[i].classList.add('active');
            } else children[i].classList.remove('active');
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
                console.log(error);
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
                                onFocus={this.handleFocus.bind(this)}/>
                    </label><br/>
                    <label>
                        <img src={require("./img/password.png")} alt="password"/>
                        <input type="text" className="" placeholder="Password"
                               ref={(password) => this.password = password}
                               onChange={this.handleChange.bind(this, 'password')}/>
                    </label><br/>
                    <label>
                        <img src={require("./img/email.png")} alt="email"/>
                        <input type="text" className="" placeholder="Email address"
                               ref={(email) => this.email = email}
                               onChange={this.handleChange.bind(this, 'email')}/>
                    </label><br/>
                    <input  type="submit" className="button" value="SIGN UP"
                           disabled={username || password || email}/>
                </form>
                <p>Already have an account? <a className="login" href="#">Login</a></p>
            </section>
        )
    }
}


export default Register;
