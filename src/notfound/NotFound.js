import React from 'react';
import './notfound.css';
import * as $ from 'jquery';
import {inject, observer} from 'mobx-react';
import Auth from '../authentication/Auth.js';
import Register from '../register/Register.js';

@inject("user", "menu") @observer
class NotFound extends React.Component {

    componentWillMount() {
        if (!this.props.user.isAuthenticated) {
            $.get("http://localhost:3001/api/check-auth")
                .done((res) => {
                    if (res.status) {
                        this.props.user.isAuthenticated = true;
                        return;
                    }
                    this.props.user.isAuthenticated = false;
                })
                .fail((error) => {
                    this.props.history.push('/error');
                })
        }
    }

    render() {
        return (
            <section>
                <section className="not-found">
                    <p>404 Not Found :(</p>
                </section>
                <section>
                    { this.props.menu.popUp==='signIn' && <Auth />}
                    { this.props.menu.popUp==='signUp' && <Register />}
                </section>
            </section>

        )
    }
}

export default NotFound;
