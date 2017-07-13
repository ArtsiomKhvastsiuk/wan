import React from 'react';
import './app.css';
import * as $ from 'jquery';
import {inject} from 'mobx-react';
import AlertBox from '../helpers/AlertBox';

@inject("user")
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.user.isAuthenticated) {
            $.get("http://localhost:3001/api/check-auth")
                .done((res) => {
                    if (res.status) {
                        this.props.user.isAuthenticated = true;
                        return;
                    }
                    this.props.user.isAuthenticated = false;
                })
                .fail((error) => {
                    alert("App.js - error - /check-auth");
                })
        }
    }

    render() {
        return (
            <main>
                { this.props.user.alertFlag && <AlertBox /> }
                <p>wan</p>
            </main>
        )
    }
}

export default App;
