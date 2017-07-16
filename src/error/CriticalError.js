import React from 'react';
import './criticalError.css';

class CriticalError extends React.Component {
    componentDidMount() {
        console.log(this.props.location);
    }

    render() {
        return (
            <section className="critical-error">
                <h1>Something went wrong :(</h1>
            </section>
        )
    }
}


export default CriticalError;
