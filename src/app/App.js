import React from 'react';
import './app.css';
import Auth from '../authentication/Auth.js';
import Register from '../register/Register.js';
import {inject, observer} from 'mobx-react';
import * as $ from 'jquery';

import AlertBox from '../helpers/AlertBox';

@inject("user")
@inject ("menu") @observer
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
                    this.props.history.push('/error');
                })
        }
    }

    componentDidMount() {
        document.body.classList.add("bodyApp");
    }


    render() {
        return (
            <section>
                <main>
                    { this.props.user.alertFlag && <AlertBox /> }
                    <p>wan</p>
                </main>
                { this.props.menu.popUp==='signIn' && <Auth />}
                { this.props.menu.popUp==='signUp' && <Register />}
            </section>
        )
    }
}

export default App;
