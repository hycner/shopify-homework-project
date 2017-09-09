// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Menu, Icon} from 'antd';

import './nav.css';

let MenuItem = Menu.Item;

let links = [
  {path: '/', label: 'IMPORT', icon: 'download'},
  {path: '/display', label: 'DISPLAY', icon: 'shop'},
];

type TProps = {
  history: Object,
};

class Nav extends Component<TProps> {
  handleClick = (e: Object) => {
    this.props.history.push(e.key);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.props.history.location.pathname]}
        mode="horizontal"
      >
        {links.map(x =>
          <MenuItem key={x.path}>
            <Icon type={x.icon} />
            {x.label}
          </MenuItem>
        )}
      </Menu>
    );
  }
}

export default withRouter(Nav);
