import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';

const HouseownerLoginscreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function login() {
        const houseowner = {
            email,
            password
        };
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/houseowners/login', houseowner);
            const result = response.data;
            setLoading(false);

            if (result && result._id) {
                localStorage.setItem('currentHouseowner', JSON.stringify(result)); // Use currentHouseowner key
                window.location.href = '/houseowner'; // Redirect to dashboard
            } else {
                setError(true);
            }
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }
   return (
        <div>
            {loading && <Loader />}
            <div className="register-screen-container">
                {error && <Error message="Invalid Credentials" />}
                <div className="register-form-container">
                    <h1>Login Here</h1>
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
                    <button className="btn login" onClick={login}>
                        Login
                    </button>
                    <p className="mt-3">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HouseownerLoginscreen;
