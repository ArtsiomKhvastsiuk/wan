import React, {Component} from 'react';
import * as $ from 'jquery';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: true,
            password: true,
            email: true,
        };
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
            <section>
                <img src=""/>
                <p>Save your account now</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        <input type="text" className="" placeholder="Login"
                               ref={(username) => this.username = username}
                               onChange={this.handleChange.bind(this, 'username')}/>
                    </label>
                    <label>
                        <input type="text" className="" placeholder="Password"
                               ref={(password) => this.password = password}
                               onChange={this.handleChange.bind(this, 'password')}/>
                    </label>
                    <label>
                        <input type="text" className="" placeholder="Email address"
                               ref={(email) => this.email = email}
                               onChange={this.handleChange.bind(this, 'email')}/>
                    </label>
                    <input type="submit" className="" value="SIGN UP"
                           disabled={username || password || email}/>
                </form>
                <p>Already have an account? <a href="#">Login</a></p>
            </section>
        )
    }
}


export default Register;
