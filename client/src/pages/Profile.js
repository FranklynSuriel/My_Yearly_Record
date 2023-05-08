// import React from "react";
// import { MailOutlined, AppstoreOutlined, } from '@ant-design/icons';
// import { Menu, Switch } from 'antd';
// import { useState } from 'react';

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }
// const items = [
//   getItem('Book Lists', 'sub1', <MailOutlined />, [
//     getItem('Books to read', '1'),
//     getItem('Books read', '2'),
//   ]),
//   getItem('TV Show Lists', 'sub2', <AppstoreOutlined />, [
//     getItem('Shows to Watch', '3'),
//     getItem('Shows Watched', '4'),
//   ]),
// ];
// const App = () => {
//   const [theme, setTheme] = useState('dark');
//   const [current, setCurrent] = useState('1');
//   const changeTheme = (value) => {
//     setTheme(value ? 'dark' : 'light');
//   };
//   const onClick = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };
//   return (
//     <>
//       <Switch
//         checked={theme === 'dark'}
//         onChange={changeTheme}
//         checkedChildren="Dark"
//         unCheckedChildren="Light"
//       />
//       <br />
//       <br />
//       <Menu
//         theme={theme}
//         onClick={onClick}
//         style={{
//           width: 256,
//         }}
//         defaultOpenKeys={['sub1']}
//         selectedKeys={[current]}
//         mode="inline"
//         items={items}
//       />
//     </>
//   );
// };
// export default App;

import React from 'react';
// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';

// import { QUERY_USER, QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';

// const Profile = () => {
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam },
//   });

//   const user = data?.me || data?.user || {};
//   // navigate to personal profile page if username is yours
//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Navigate to="/me" />;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this. Use the navigation links above to
//         sign up or log in!
//       </h4>
//     );
//   }

const Profile = () => {
  return (
    <div>
      <h3>Hello from profile</h3>
      {/* <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThoughtForm />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Profile;
