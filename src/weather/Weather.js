import React, {Component} from 'react';
import './weather.css';
import * as $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country: "",
            city: "",
            temp: 0,
            errorText: "",
            hasMounted: false,
            refresh: true
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
                        temp: data.current_observation.temp_c,
                        hasMounted: true,
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


    render() {
        return (
            <section className="weather-container">
                <section className="refresh">
                    {
                        this.state.refresh &&
                        <CircularProgress size={60} thickness={7} color="#ffff1e    "/>
                    }
                </section>

                {this.state.hasMounted &&
                <section className="data-of-temp">
                    <p>{this.state.country}, {this.state.city}</p>
                    <p>{this.state.temp} &deg;C</p>
                </section>
                }
                <section className="request-failed">
                    <p>{this.state.errorText}</p>
                </section>
            </section>
        )
    }

}

export default Weather;