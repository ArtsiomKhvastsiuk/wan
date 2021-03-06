import React from 'react'
import * as $ from 'jquery';
import {inject, observer} from 'mobx-react';
import './profile.css';

@inject("user") @observer
class Profile extends React.Component {

    componentWillMount() {
        if (this.props.user.isAuthenticated === false)
            this.props.history.push('/');
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

        $.get('http://localhost:3001/api/profile')
            .done((res) => {
                if (res.status) {
                    console.log(res.user);
                    this.props.user.username = res.user.username;
                    this.props.user.email = res.user.email;
                }
            })
            .fail((error) => {
                console.log(error);
            });

        document.body.className = "bodyProfile";
    }


    componentDidMount() {
        const heigth = $(window).height();
        $('.profile').css('height', heigth);
    }

    componentWillUnmount() {
        document.body.classList.remove("bodyProfile");
    }

    render() {
        return (
            <section className="profile">
                    <section className="profile-content">
                        <p className="profile-text">login:</p>
                        <p className="profile-data" id="username">{this.props.user.username}</p>
                    </section>
                    <section className="profile-content">
                        <p className="profile-text">email address:</p>
                        <p className="profile-data" id="emaill">{this.props.user.email}</p>
                    </section>
                    <section className="profile-content">
                        <p className="profile-text">registration date:</p>
                        <p className="profile-data" id="dateReg">19.09.2017</p>
                    </section>
            </section>
        )
    }
}

export default Profile;