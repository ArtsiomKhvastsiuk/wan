import React from 'react';
import {inject, observer} from "mobx-react";

@inject("form") @observer
class Popover extends React.Component {
    render() {
        return (
            <section className="popover">
                <section className="popover-overlay">
                    <p className={this.props.className}>{this.props.form.text}</p>
                </section>
            </section>
        )
    }
}

export default Popover;