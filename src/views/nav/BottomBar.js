import React, {Component} from 'react';

export default class BottomBar extends Component {
    render() {
        return (
            <div className="nav-bottom-bar">
                {this.props.children}
            </div>
        );
    }
}
