import React, {Component} from 'react';
import Article from './Article'
import Auth from '../authentication/Auth.js';
import Register from '../register/Register.js';
import * as $ from 'jquery';
import {inject, observer} from 'mobx-react';

@inject ("user", "menu", "weather") @observer

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

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

        let articles = [];
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3001/api/news',
            dataType: 'json',
            contentType: 'application/json',
            success: (data) => {
                alert(data.text)
            }
        })
    }

    componentDidMount() {
        const menuItems = document.querySelectorAll('.menu a');
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].innerHTML === 'news')
                menuItems[i].classList.add('active');
        }
        this.props.weather.isWeather = false;

    }

    render() {
        const articles = this.state.articles;
        return (
            <section>
                {
                    articles.map((item, index) => {
                        return <Article key={index} resourse={item.resource} date={item.date}
                                        title={item.title} description={item.description}/>
                    })
                }
                { this.props.menu.popUp==='signIn' && <Auth />}
                { this.props.menu.popUp==='signUp' && <Register />}
            </section>
        )
    }
}

export default News;

