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

    componentWillMount() {
        const self = this;
        $.getJSON('http://ip-api.com/json')
            .done((data) => {
                const http = new XMLHttpRequest();
                const url = "http://api.wunderground.com/api/6d5cd374a1229785/conditions/q/" + data.countryCode + '/' + data.city + ".json";
                http.open("GET", url, true);
                http.onreadystatechange = function () {
                    if (http.readyState === 4 && http.status === 200) {
                        const responseText = http.responseText;
                        const responseObject = JSON.parse(responseText);
                        const reqFailed = document.getElementsByClassName('request-failed');
                        reqFailed[0].style.display = 'none';
                        self.setState({
                            country: data.country,
                            city: data.city,
                            temp: responseObject.current_observation.temp_c,
                            hasMounted: true,
                            refresh: false
                        });
                    }
                };
                http.send();
            })
            .fail((xhr, textStatus,) => {
                const reqFailed = document.getElementsByClassName('request-failed');
                self.setState({
                    errorText: "ERROR!"
                });
                reqFailed[0].style.display = 'block';
            })
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