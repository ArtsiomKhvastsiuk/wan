import React, {Component} from 'react';
import  './weather.css';
import * as $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import Search from '../menu/Search';
import {inject, observer} from 'mobx-react'


@inject("user") @observer
class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country: "",
            city: "",
            temp: 0,
            errorText: "",
            isMounted: false,
            refresh: true,
            date: new Date().toLocaleString()
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
                    self.setState({
                        country: data.current_observation.display_location.state_name,
                        city: data.current_observation.display_location.city,
                        temp: Math.floor(data.current_observation.temp_c),
                        isMounted: true,
                        refresh: false
                    });
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

    render() {
        return (
            <section>
                <Search />
                <section className="weather-container">
                    <section className="refresh">
                        {
                            this.state.refresh &&
                            <CircularProgress size={60} thickness={7} color="#ffd200"/>
                        }
                    </section>

                    {
                        this.state.isMounted &&
                        <section className="data-of-temp">
                            <p className="location">{this.state.country}, {this.state.city}</p>
                            <p className="temperature">{this.state.temp}&deg;</p>
                            <p className="date">{this.state.date}</p>
                        </section>
                    }
                    <section className="request-failed">
                        <p>{this.state.errorText}</p>
                    </section>
                </section>
            </section>
        )
    }

}

export default Weather;