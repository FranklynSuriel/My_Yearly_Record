import React from 'react';
import {
    HomeOutlined,    
    SmileOutlined
  } from '@ant-design/icons';
  import { Space } from 'antd';


function Footer(){
    return (
        <div className='footer'>
            <Space>
            <HomeOutlined href="/" />
            <SmileOutlined />
            </Space>
        </div>
    )
}

export default Footer;

