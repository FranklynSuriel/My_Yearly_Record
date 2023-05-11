import React, { useState } from "react";
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME} from '../utils/queries';
import Auth from '../utils/auth';
import { PlayCircleOutlined, 
  TeamOutlined, 
  BookOutlined,
  } from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
console.log(getItem)

const items = [
  
  
  getItem('Book List', 'sub1', <BookOutlined />, [
    getItem('Reading', '1'),
    getItem('To Read', '2'),
    getItem('Read', '3'),    
  ]),
  getItem('Tv Show List', 'sub2', <PlayCircleOutlined />, [
    getItem('Watching', '4'),
    getItem('To Watch', '5'),
    getItem('Watched', '6'),    
  ]),
  getItem('Friend', '7', <TeamOutlined />),
  
];

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_ME);
  



  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  // const ode, setMode] = useState('inline');
  // const [theme, setTheme] = useState('light');
  // const changeMode = (value) => {
  //   setMode(value ? 'vertical' : 'inline');
  // };
  // const changeTheme = (value) => {
  //   setTheme(value ? 'dark' : 'light');
  // };[m

  return (
    <>
      {/* <Switch onChange={changeMode} /> Change Mode
      <Divider type="vertical" />
      <Switch onChange={changeTheme} /> Change Style */}
      <br />
      <br />
      <Menu
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        // mode={mode}
        // theme={theme}
        items={items}
      />
    </>
  )
}

export default Profile;


