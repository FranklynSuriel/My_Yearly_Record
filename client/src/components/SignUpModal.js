import React from 'react';
import Signup from './Signup';
import "../Modal.css";

function SignUpModal({closeModal}){
    return <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='titleCloseBtn'>
            <button onClick={()=> closeModal(false)}> X </button>
            </div>
            <div className='title'></div>
            <div className='body'>
                <Signup />
            </div>
            <div className='footer'>
                <button>Login</button>
                <button onClick={()=> closeModal(false)}>Close</button>
            </div>

        </div>
    </div>
}

export default SignUpModal;