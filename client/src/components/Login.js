// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// // import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';
// import { LOGIN } from '../utils/mutations';
// import { useMutation } from '@apollo/client';

// const LoginForm = () => {
//     const [userFormData, setUserFormData] = useState({ email: '', password: '' });
//     const [validated] = useState(false);
//     const [showAlert, setShowAlert] = useState(false);
//     const [login] = useMutation(LOGIN); //, { error, data }

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setUserFormData({ ...userFormData, [name]: value });
//     };

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         console.log(userFormData);
//         // check if form has everything (as per react-bootstrap docs)
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//         }

//         try {
//             const { data } = await login({
//                 variables: { ...userFormData },
//             });

//             Auth.login(data.login.token)
//         } catch (err) {
//             console.error(err);
//             setShowAlert(true);
//         }

//         setUserFormData({
//             username: '',
//             email: '',
//             password: '',
//         });
//     };

//     return (
//         <>
//             <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//                 <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
//                     Something went wrong with your login credentials!
//                 </Alert>
//                 <Form.Group className='mb-3'>
//                     <Form.Label htmlFor='email'>Email</Form.Label>
//                     <Form.Control
//                         type='text'
//                         placeholder='Your email'
//                         name='email'
//                         onChange={handleInputChange}
//                         value={userFormData.email}
//                         required
//                     />
//                     <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className='mb-3'>
//                     <Form.Label htmlFor='password'>Password</Form.Label>
//                     <Form.Control
//                         type='password'
//                         placeholder='Your password'
//                         name='password'
//                         onChange={handleInputChange}
//                         value={userFormData.password}
//                         required
//                     />
//                     <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
//                 </Form.Group>
//                 <Button
//                     disabled={!(userFormData.email && userFormData.password)}
//                     type='submit'
//                     variant='success'>
//                     Submit
//                 </Button>
//             </Form>
//         </>
//     );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
            // save the username to local store 
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card login-form">
                    <h4 className="card-header" id='login-title'>Login</h4>
                    <div className="card-body">
                        {data ? (
                            <p id='success-container'>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;