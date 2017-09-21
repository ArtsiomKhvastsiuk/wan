import React, {Component} from 'react';
import  './weather.css';
import Auth from '../authentication/Auth.js';
import Register from '../register/Register.js';
import * as $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import {inject, observer} from 'mobx-react'
import dateFormat from 'dateformat';
import Logo from '../menu/Logo';


@inject("user", "weather", "menu") @observer
class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    getCurrentPosition(cb) {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            cb(null, position);
        }, (error) => {
            cb(error);
        })
    }


    getWeatherFrom(city) {
        const url = "https://api.wunderground.com/api/6d5cd374a1229785/conditions/q/" + city.coords.latitude + ',' + city.coords.longitude + ".json";
        $.getJSON(url)
            .done((data) => {
                this.props.weather.data.country = data.current_observation.display_location.state_name;
                this.props.weather.data.city = data.current_observation.display_location.city;
                this.props.weather.data.temp = Math.floor(data.current_observation.temp_c);
                this.props.weather.data.isMounted = true;
                this.props.weather.data.refresh = false;
            })
            .fail((error) => {
                this.setState({
                    errorText: "Weather Api doesn't respond. Please try to reload this page later or use city selection menu."
                });
                this.props.weather.error = true;
            });
    }

    componentWillMount() {
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
            });

        document.body.classList.add("bodyWeather");

        /*const self = this;*/
        this.getCurrentPosition((error, result) => {
            if (error) {
                    const city = {
                        coords: {
                            latitude: 53.9000000,
                            longitude: 27.5666700,
                        },
                    };
                    return this.getWeatherFrom(city);
                }
            this.getWeatherFrom(result);
        });
    }

    componentWillUnmount() {
        document.body.classList.remove("bodyWeather");
    }

    componentDidMount() {
        // if isWeather state is true then dropDown menu and menuIcon are rendered
        this.props.weather.isWeather = true;
        const menuItems = document.querySelectorAll('.menu a');
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].innerHTML === 'weather')
                menuItems[i].classList.add('active');
        }

        setInterval(() => {
            this.setState({
                date: new Date(),
            });
        }, 1000);
        this.props.weather.error = false;
    }

    close() {
        this.props.weather.error = false;
    }

    render() {
        let date = dateFormat(this.state.date, "dddd, mmmm dS, HH:MM:ss");
        return (
            <section>
                <section className="weather-container">
                    <section className="refresh">
                        {
                            this.props.weather.data.refresh &&
                            <CircularProgress size={60} thickness={7} color="#ffd200"/>
                        }
                    </section>

                    {
                        this.props.weather.data.isMounted &&
                        <section className="data-of-temp">
                            <p className="location"><span>{this.props.weather.data.country}</span>, {this.props.weather.data.city}</p>
                            <p className="temperature">{this.props.weather.data.temp}&deg;</p>
                            <p className="date">{date}</p>
                        </section>
                    }
                    { this.props.menu.popUp === 'signIn' && <Auth />}
                    { this.props.menu.popUp === 'signUp' && <Register />}
                </section>
                {
                    this.props.weather.error &&
                    <section className="overlay center">
                        <section className="weather-error">
                                <p>{this.state.errorText}</p>
                                <img onClick={this.close.bind(this)} src={require('./img/close.png')}/>
                        </section>
                    </section>
                }

            </section>
        )
    }

}

export default Weather;