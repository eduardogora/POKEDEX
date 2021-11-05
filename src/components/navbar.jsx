import React, { Component } from "react";
import { Menu, Input } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Search } = Input;

class Navbar extends Component {
  state = {
    isPokemonPage: this.props.isPokemonPage,
  };

  render() {
    const { current } = this.state;
    return (
      <div>
        <Menu onClick={this.props.handleHomeClick} selectedKeys={[current]} mode="horizontal" style={{ padding: 20, backgroundColor: "#CC0000" }}>
          <Menu.Item key="mail" style={{width: "70%", textAlign: "center"}}>
            Pokedex
          </Menu.Item>
          <Menu.Item key="searcher" style={{width: "30%", textAlign: "center"}}>
                <Search placeholder="input search text" onChange={this.props.onSearch} style={{ width: 200, padding: 10 }} />
          </Menu.Item>
        </Menu>        
      </div>
    );
  }
}

export default Navbar;