import React from 'react';
import './criticalError.css';
import * as $ from 'jquery';
import {inject} from 'mobx-react';

@inject("user")
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
                    window.location = 'http://localhost:3001/error';
                })
        }
    }

    render() {
        return (
            <section className="critical-error">
                <h1>Something went wrong :(</h1>
            </section>
        )
    }
}


export default CriticalError;
