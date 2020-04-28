import React, {Component} from 'react';

export default class TopBar extends Component {
    render() {
        return (
            <div className="nav-top">
                <div></div>
                {this.props.children}
            </div>
        );
    }
}
