import * as $ from 'jquery';

import {inject} from 'mobx-react';

@inject("user")

class Helpers {
    checkAuth() {
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
            })
    }
}

export default Helpers;
