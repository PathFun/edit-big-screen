import React, {Component} from 'react';

export default class SiderRightBar extends Component {
    render() {
        return (
            <div className="nav-sider-right">
                {this.props.children}
            </div>
        );
    }
}
