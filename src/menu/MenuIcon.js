import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import { withRouter } from 'react-router-dom';
import * as $ from 'jquery';

const menuIconStyle = {
    margin: '0 34px 0 -20px',
};

class MenuIcon extends React.Component {

    onClick(value, event) {
        const menuItems = document.querySelectorAll('.menu a');
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i] !== event.target) {
                menuItems[i].classList.remove('active');
            }
        }

        if (value === 'profile') {
            this.props.history.push('/profile');
        } else if (value === 'signOut') {
            $.get('http://localhost:3001/api/logout')
                .done((res) => {
                    if (res) {
                        window.location = '/';
                    }
                })
                .fail((error) => {
                    this.props.history.push('/error')
                });
        }
    }

    render() {
        return (
            <div style={menuIconStyle}>
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                >
                    <MenuItem primaryText="Profile" onClick={this.onClick.bind(this, "profile")}/>
                    <Divider />
                    <MenuItem primaryText="Sign out" onClick={this.onClick.bind(this, "signOut")}/>
                </IconMenu>
            </div>
        )
    }
}


export default withRouter(MenuIcon);