import React from 'react';
import './app.css';
import * as $ from 'jquery';
import {inject} from 'mobx-react';

import Menu from '../menu/Menu';
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

    componentDidMount() {
        document.body.classList.add("bodyApp");
    }


    render() {
        return (
            <section>
                <Menu />
                <main>
                    { this.props.user.alertFlag && <AlertBox /> }
                    <p>wan</p>
                </main>
            </section>
        )
    }
}

export default App;
