import React from 'react'
import * as $ from 'jquery';
import {inject, observer} from 'mobx-react';

@inject("user") @observer
class Profile extends React.Component {

    componentWillMount() {
        if (!this.props.user.isAuthenticated) {
            $.get("/api/check-auth")
                .done((res) => {
                    if (res.status) {
                        this.props.user.isAuthenticated = true;
                        return;
                    }
                    this.props.user.isAuthenticated = false;
                })
                .fail((error) => {
                    alert("App.js - error - /check-auth");
                })
        }

        $.get('/api/profile')
            .done((res) => {
                if (res.status) {
                    console.log(res.user);
                    this.props.user.username = res.user.username;
                    this.props.user.email = res.user.email;
                }
            })
            .fail((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <section className="profile">
                <p>{this.props.user.username}</p>
                <p>{this.props.user.email}</p>
            </section>
        )
    }
}

export default Profile;