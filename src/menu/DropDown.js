import React from 'react';
import './drop-down.css';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {inject} from 'mobx-react';
import * as $ from "jquery";

const cities = {
    1: "Minsk",
    2: "Brest",
    3: "Vitebsk",
    4: "Grodno",
    5: "Gomel",
    6: "Pinsk"
}


@inject("user", "weather")
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    handleChange = (event, index, value) => {
        this.setState({value});
    }



    onClick = () => {
        const self = this;
        const url = "https://api.wunderground.com/api/6d5cd374a1229785/conditions/q/BY/"+ cities[this.state.value] + ".json";
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
    }

    render() {
        return (
            <section className="drop-down">
                <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                    <MenuItem onClick={this.onClick} value={1} primaryText="Minsk"/>
                    <MenuItem onClick={this.onClick.bind(this)} value={2} primaryText="Brest"/>
                    <MenuItem onClick={this.onClick} value={3} primaryText="Vitebsk"/>
                    <MenuItem onClick={this.onClick} value={4} primaryText="Grodno"/>
                    <MenuItem onClick={this.onClick} value={5} primaryText="Gomel"/>
                    <MenuItem onClick={this.onClick} value={6} primaryText="Pinsk"/>
                </DropDownMenu>
            </section>
        )
    }
}

export default Search;