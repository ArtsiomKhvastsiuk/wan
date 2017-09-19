import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

const menuIconStyle = {
    margin: '0 34px 0 -20px',
};

const MenuIcon = () => (

    <div style={menuIconStyle}>
        <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'middle', vertical: 'top'}}
        >
            <MenuItem primaryText="Profile" />
            <Divider />
            <MenuItem primaryText="Sign out" />
        </IconMenu>
    </div>
);

export default MenuIcon;