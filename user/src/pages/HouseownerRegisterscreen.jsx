import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';
import Success from '../components/Success';
import '../pages/HouseOwner.css';
const HouseownerRegisterscreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    async function register() {
        if (password === cpassword) {
            const houseowner = { name, email, password, cpassword };
            try {
                setLoading(true);
                await axios.post('/api/houseowners/register', houseowner)
                // await axios.post('http://localhost:5000/api/houseowners/register', houseowner); ; 
                setLoading(false);
                setSuccess(true);
                window.location.href = '/houseowner/login';
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
        <div>
            <div className="register-screen-container">
                {loading && <Loader />}
                {error && <Error />}
                <div className="register-form-container">
                    {success && <Success message="Successfully Registered" />}

                    <h1 className='view-details'>Houseowner Registration!!!</h1>
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
            </div></div>
    );
};

export default HouseownerRegisterscreen;
