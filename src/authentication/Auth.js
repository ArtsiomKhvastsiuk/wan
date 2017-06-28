import React, {Component} from 'react';
import * as $ from 'jquery';
import './auth.css';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: true,
            password: true,
        };
    }

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
                console.log(res);
                this.username.value = "";
                this.password.value = "";
            })
            .fail((error) => {
                console.log(error);
            })
    }

    render() {
        let username = this.state.username;
        let password = this.state.password;

        return (
            <section className="form">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        <img src={require("./img/login.png")} alt="login"/>
                        <input type="text" className="" placeholder="login"
                               ref={(username) => this.username = username}
                               onChange={this.handleChange.bind(this, 'username')}
                               onFocus={this.handleFocus.bind(this, 'login')}/>
                    </label><br/>
                    <label>
                        <img src={require("./img/password.png")} alt="password"/>
                        <input type="text" className="" placeholder="Password"
                               ref={(password) => this.password = password}
                               onChange={this.handleChange.bind(this, 'password')}
                               onFocus={this.handleFocus.bind(this, 'password')}/>
                    </label><br/>
                    <input  type="submit" className="button" value="SIGN IN"
                            /*disabled={username || password}*/ />
                </form>
            </section>
        )
    }
}


export default Authentication;

