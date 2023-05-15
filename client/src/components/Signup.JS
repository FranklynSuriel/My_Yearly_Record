import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations'

const Signup = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
   
    const [addUser, { error, data }] = useMutation(ADD_USER); //{ error, data }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Hello from handleFormSubmit");
        console.log(userFormData);
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });

            Auth.login(data.addUser.token)



        } catch (err) {
            console.error(err);
            // setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="sign-card">
                    <h4 className="card-header">Sign Up</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="Your username"
                                    name="username"
                                    type="text"
                                    value={userFormData.name}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    value={userFormData.email}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={userFormData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-info"
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

export default Signup;