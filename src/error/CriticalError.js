import React from 'react';
import './criticalError.css';
import * as $ from 'jquery';
import Auth from '../authentication/Auth.js';
import Register from '../register/Register.js';
import {inject, observer} from 'mobx-react';

@inject("user", "menu") @observer
class CriticalError extends React.Component {

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
                <section className="critical-error">
                    <h1>Something went wrong :(</h1>
                </section>
                <section>
                    { this.props.menu.popUp==='signIn' && <Auth />}
                    { this.props.menu.popUp==='signUp' && <Register />}
                </section>
            </section>
        )
    }
}


export default CriticalError;
