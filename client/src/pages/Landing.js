import React from 'react';
import vintage from '../assets/images/francisco-andreotti-MwrpaS_6f2U-unsplash.jpg';
import purple from '../assets/images/pexels-mo-eid-11592813.jpg';
import Carousel from 'react-bootstrap/Carousel';
import dreamy from '../assets/images/pexels-mo-eid-11592804.jpg';
import tree from '../assets/images/pexels-mo-eid-9454915.jpg';
import lake from '../assets/images/pexels-mo-eid-9310623.jpg';
import pool from '../assets/images/pexels-mo-eid-9063025.jpg';


function Landing() {
    return (
    
        <div className='container-landing'>
            <h2 className="landing-item1">Sign in
            to make a record of your lists to share with friends!</h2>
            <Carousel>
                <Carousel.Item>
            <img 
            className='d-block justify-content-center landing-item2' 
            src={dreamy}
            // style={{margin:'auto'}}
             alt="image1" />
            </Carousel.Item>
            <Carousel.Item>
            <img 
            className='d-block justify-content-center landing-item2' 
            src={purple}
             alt="image2" />
            </Carousel.Item>
            <Carousel.Item>
            <img 
            className='d-block justify-content-center landing-item2' 
            src={tree}

             alt="image3" />
            </Carousel.Item>
            <Carousel.Item>
            <img 
            className='d-block justify-content-center landing-item2' 
            src={lake}
             alt="image4" />
            </Carousel.Item>
            <Carousel.Item>
            <img 
            className='d-block justify-content-center landing-item2' 
            src={pool}
             alt="image5" />
            </Carousel.Item>

            </Carousel>
            <p className="landing-item3">Do you forget everything you've seen or read right after it happened? What if there was a fun way to keep track of your lists and see your friends as well. Join our site to keep track of the fun things you read and watch and share with your friends! You know you're always suggesting things for them to watch, now they can remember them and show you theirs!</p>
        </div>
    )
}

export default Landing;