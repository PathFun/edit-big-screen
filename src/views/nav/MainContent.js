import React, {Component} from 'react';

export default class MainContent extends Component {
    render() {
        return (
            <div className="nav-main-content">
                {this.props.children}
            </div>
        );
    }
}
