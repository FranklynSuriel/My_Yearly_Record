import React from "react";
import { MailOutlined, AppstoreOutlined, } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useState } from 'react';
// import Card from '../components/Card/Card';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Book Lists', 'sub1', <MailOutlined />, [
    getItem('Books to read', '1'),
    getItem('Books read', '2'),
  ]),
  getItem('TV Show Lists', 'sub2', <AppstoreOutlined />, [
    getItem('Shows to Watch', '3'),
    getItem('Shows Watched', '4'),
  ]),
];
const App = () => {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </>
  );
};
export default App;