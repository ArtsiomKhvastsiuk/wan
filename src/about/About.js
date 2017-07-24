import React from "react";
import * as $ from 'jquery';
import {inject} from 'mobx-react';

@inject ("user")
class About extends React.Component {

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

    componentDidMount() {
        const menuItems = document.querySelectorAll('.menu');
        menuItems[2].classList.add('active');
    }

    render() {
        return (
            <section>
            </section>
        )
    }
}

export default About;
