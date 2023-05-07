import React from 'react';
import Login from './Login';
import "../Modal.css";

function Modal({closeModal}){
    return <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='titleCloseBtn'>
            <button onClick={()=> closeModal(false)}> X </button>
            </div>
            <div className='title'></div>
            <h2>Login to your account!</h2>
            <div className='body'>
                <Login />
            </div>
            <div className='footer'>
                <button>Login</button>
                <button onClick={()=> closeModal(false)}>Close</button>
            </div>

        </div>
    </div>
}

export default Modal;