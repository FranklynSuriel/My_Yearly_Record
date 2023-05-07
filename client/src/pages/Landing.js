import React, { useState } from 'react';
import vintage from '../assets/images/francisco-andreotti-MwrpaS_6f2U-unsplash.jpg';

function Landing() {
    return (
        <div className='container-landing'>
            <p className="landing-item1">Do you forget everything you've seen or read right after it happened? What if there was a fun way to keep track of your lists and see your friends as well. Join our site to keep track of the fun things you read and watch and share with your friends! You know you're always suggesting things for them to watch, now they can remember them and show you theirs!</p>
            <img className='landing-item2' src={vintage} alt="vintage tv" />
            {/* <p className='landing-item2'>Do you forget everything you've seen or read right after it happened? What if there was a fun way to keep track of your lists and see your friends as well. Join our site to keep track of the fun things you read and watch and share with your friends! You know you're always suggesting things for them to watch, now they can remember them and show you theirs!</p> */}
            <p className="landing-item3">Do you forget everything you've seen or read right after it happened? What if there was a fun way to keep track of your lists and see your friends as well. Join our site to keep track of the fun things you read and watch and share with your friends! You know you're always suggesting things for them to watch, now they can remember them and show you theirs!</p>
        </div>
    )
}

export default Landing;