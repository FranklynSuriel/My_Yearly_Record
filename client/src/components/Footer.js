import React from 'react';
import {
    HomeOutlined,
    SmileOutlined
} from '@ant-design/icons';
import { Space } from 'antd';

// import { useLocation, useNavigate } from 'react-router-dom';


// const Footer = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
function Footer() {
    return (
        <div className='footer-box'>
            <div className='footer-container'>
                <div className="box" style={{ '--size': '40px' }}>
                    <div className='footer'>

                        <footer>
                            {/* <Space>
                        {/* <HomeOutlined href="/" />
                        <SmileOutlined />
                        </Space> */}
                            {/* <p className='footer.text'>  Made with{' '}
                            <span
                                className="emoji"
                                role="img"
                                aria-label="heart"
                                aria-hidden="false"
                            >
                                ❤️
                            </span>{' '}
                            by the Programmer's Paradise team.
                        </p> */}
                            <div class="row">
                                <a href="#"><i class="fa-brands fa-github"></i></a>
                            </div>

                            {/* <div class="row">
                            <ul>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">Our Services</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Career</a></li>
                            </ul>
                        </div> */}

                            <div class="row">
                                Programmer's Paradise 2023
                            </div>
                            {/* </div> */}

                        </footer>
                    </div>
                </div >
            </div >
        </div>
    )
}

export default Footer;

