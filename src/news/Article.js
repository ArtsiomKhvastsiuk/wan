import React, {Component} from 'react';
import './articles.css';

class Article extends Component {
    render() {
        let description = this.props.description;
        const regex = /(<([^>]+)>)/ig;
        description = description.replace(regex, "");
        description = description.slice(0, 130).trim();

        return (
            <a href={this.props.link} target="blank" className="article">
                <p className="article-title">{this.props.title}</p>
                <p className="article-text">{description}...</p>
                <p className="article-date">{this.props.date}</p>
            </a>
        )
    }
}

export default Article;
