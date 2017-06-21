import React from 'react';

const Container = () => (
        <section className="data-of-temp">
            <p>{this.props.country}, {this.props.city}</p>
            <p>{this.props.temp} &deg;C</p>
        </section>
);

export default Container;
