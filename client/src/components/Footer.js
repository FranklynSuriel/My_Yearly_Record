import React from 'react';
import {
    SmileOutlined
} from '@ant-design/icons';
import { Space } from 'antd';



function Footer() {
    return (
        <div className='main-footer'>
            <div className="box" style={{ '--size': '40px' }}>

            <div className='footer-container'>

                          
                            <div className='row'>
                                <div className='col'>
                                <h5>Data provided by:</h5>
                                <ul className='list-unstyled'>
                                    <li>Google Book API</li>
                                    <li>The Movie Database (TMDB) API</li>
                                    <li className='question'><a href='https://github.com/FranklynSuriel/My_Yearly_Record'>Questions</a></li>
                                     
                                </ul>
                            </div>
                            </div>
                            <div className='row footer-end'>
                                <div className='col-sm'>
                                   
                                    <Space>
                                        {new Date().getFullYear()}
                                        <h5>Programmer's Paradise</h5><SmileOutlined />
                                    </Space>
                                </div>
                      
                            </div>    
                        </div>
                    </div>
                </div >
        
    )
}

export default Footer;

