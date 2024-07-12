import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';
import Success from '../components/Success';
const Registerscreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    async function register() {
        if (password === cpassword) {
            const user = { name, email, password, cpassword };
            try {
                setLoading(true);
                await axios.post('api/users/register', user);
                setLoading(false);
                setSuccess(true);
                window.location.href = '/login';

                setName('');
                setEmail('');
                setPassword('');
                setCPassword('');
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        } else {
            alert('Passwords do not match');
        }
    }

    return (
        <div className="register-screen-container">
            {loading && <Loader />}
            {error && <Error />}
            <div className="register-form-container">
                {success && <Success message="Successfully Registered" />}

                <h1>Register Here</h1>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input
                    type="password"
                    className="form-control"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    placeholder="Confirm Password"
                />
                <button className="btn register" onClick={register}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default Registerscreen;
