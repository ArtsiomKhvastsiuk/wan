import React, {Component} from 'react';
import  './weather.css';
import * as $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import DropDown from '../menu/DropDown';
import {inject, observer} from 'mobx-react'
import Logo from '../menu/Logo';


@inject("user", "weather") @observer
class Weather extends Component {

    constructor(props) {
        super(props);
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

    componentWillMount() {
        document.body.classList.add("bodyWeather");

        const self = this;
        this.getCurrentPosition((error, result) => {
            if (error) {
                return;
            }

            const url = "https://api.wunderground.com/api/6d5cd374a1229785/conditions/q/" + result.coords.latitude + ',' + result.coords.longitude + ".json";
            $.getJSON(url)
                .done((data) => {
                    this.props.weather.data.country = data.current_observation.display_location.state_name;
                    this.props.weather.data.city = data.current_observation.display_location.city;
                    this.props.weather.data.temp = Math.floor(data.current_observation.temp_c);
                    this.props.weather.data.isMounted = true;
                    this.props.weather.data.refresh = false;
                })
                .fail((error) => {
                    const reqFailed = document.getElementsByClassName('request-failed');
                    self.setState({
                        errorText: error
                    });
                    reqFailed[0].style.display = 'block';
                })
        });
    }

    componentWillUnmount() {
        document.body.classList.remove("bodyWeather");
    }

    componentDidMount() {
        const menuItems = document.querySelectorAll('.menu');
        menuItems[0].classList.add('active');
    }

    render() {
        return (
            <section>
                <Logo />
                <DropDown />
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
                            <p className="location">{this.props.weather.data.country}, {this.props.weather.data.city}</p>
                            <p className="temperature">{this.props.weather.data.temp}&deg;</p>
                            <p className="date">{this.props.weather.data.date}</p>
                        </section>
                    }
                    <section className="request-failed">
                        {/*<p>{this.state.errorText}</p>*/}
                    </section>
                </section>
            </section>
        )
    }

}

export default Weather;