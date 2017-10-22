import React, {Component} from 'react';
import Article from './Article'
import Auth from '../authentication/Auth.js';
import Register from '../register/Register.js';
import * as $ from 'jquery';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';

@inject("user", "menu", "weather") @observer

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
                    this.props.history.push('/error');
                })
        }

        $.get('http://localhost:3001/api/parse-habr')
            .done(res => {
                if (res.status) {
                    this.setState({
                        articles: res.parsed.entries
                    });
                } else {
                    throw new Error(res.message);
                }
            })
            .fail(error => {
                this.props.history.push('/error');
            });
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
            <section className="news">
                <h1>Habrahabr news</h1>
                <section className="articles">
                    {
                        articles.map((item, index) => {
                            return <Article key={index} date={item.pubDate}
                                            title={item.title} description={item.content} link={item.link}/>
                        })
                    }
                    { this.props.menu.popUp === 'signIn' && <Auth />}
                    { this.props.menu.popUp === 'signUp' && <Register />}
                </section>
            </section>

        )
    }
}

export default withRouter(News);

