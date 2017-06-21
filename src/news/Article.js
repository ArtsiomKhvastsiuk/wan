import React, {Component} from 'react';

class Article extends Component {
    render() {
        return (

            <article>
                <p className="title">
                    {this.props.resource}
                    <span>{this.props.data}</span>
                </p>
                <h3>{this.props.title}</h3>
                <p className="description">{this.props.description}</p>
            </article>

        )
    }
}

export default Article;
