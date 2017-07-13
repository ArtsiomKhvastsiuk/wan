import React from 'react';
import * as $ from 'jquery';
import './AlertBox.css';

class AlertBox extends React.Component {

    handleClick() {
        $(".alert-box").css("display", "none");
    }


    render() {
        return (
            <section className="alert-box">
                You are already signed in.
                <a className="close" onClick={this.handleClick.bind(this)}>&#215;</a>
            </section>
        )
    }
}

export default AlertBox;