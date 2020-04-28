import React, {Component} from 'react';

export default class SiderLeftBar extends Component {
    render() {
        return (
            <div className="nav-sider-left">
                {this.props.children}
            </div>
        );
    }
}
