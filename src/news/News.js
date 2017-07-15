import React, {Component} from 'react';
import Article from './Article'
import Auth from '../authentication/Auth.js';
import Register from '../register/Register.js';
import * as $ from 'jquery';
import {inject, observer} from 'mobx-react';

@inject ("menu") @observer

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentWillMount() {
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

