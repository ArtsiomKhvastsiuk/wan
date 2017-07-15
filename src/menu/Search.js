import React from 'react';
import './search.css';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {inject} from 'mobx-react';

const cities = {
    1: "Minsk",
    2: "Brest",
    3: "Vitebsk",
    4: "Grodno",
    5: "Gomel",
    6: "Pinsk"
}


@inject("user")
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
        this.props.user.city = cities[this.state];
    }

    render() {
        return (
            <section className="search">
                <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                    <MenuItem onClick={this.onClick} value={1} primaryText="Minsk"/>
                    <MenuItem onClick={this.onClick} value={2} primaryText="Brest"/>
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