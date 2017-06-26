import './menu.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {


    isPressed(event) {
        const header = document.getElementsByTagName('header');
        const children = header[0].children;
        for (let i = 0; i < children.length; i++) {
            if (event.target === children[i]) {
                children[i].classList.add('active');
            } else children[i].classList.remove('active');
        }
    }

    render() {
        return (
            <header>
                <Link onClick={this.isPressed.bind(this)} className="menu" to="/weather">weather</Link>
                <Link onClick={this.isPressed.bind(this)} className="menu" to="/news">news</Link>
                <Link onClick={this.isPressed.bind(this)} className="menu" to="/about">about</Link>
                <Link onClick={this.isPressed.bind(this)} className="menu" to="/signup">sign up</Link>
            </header>
        )
    }
}

export default Menu;
