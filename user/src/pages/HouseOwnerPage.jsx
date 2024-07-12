import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../pages/HouseOwner.css';
const HouseOwnerPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [houseOwnerName, setHouseOwnerName] = useState('');
    useEffect(() => {
        const houseOwner = JSON.parse(localStorage.getItem('currentHouseowner'));
        if (houseOwner && houseOwner.name) {
            setIsLoggedIn(true);
            setHouseOwnerName(houseOwner.name);
        } else {
            setIsLoggedIn(false);
            setHouseOwnerName('');
        }
    }, []);

    function logout() {
        localStorage.removeItem('currentHouseowner');
        setIsLoggedIn(false);
        setHouseOwnerName('');
        window.location.href = '/login';
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" className="logo" />
                    <span style={{ color: 'white', marginLeft: '20px' }}>House Owner Dashboard</span>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/houseowner/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/houseowner/login">Login</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/houseowner/addroom">Add Rooms</a>
                                </li>

                                <li className="nav-item dropdown">
                                    <button className="btn dropdown-toggle name" data-toggle="dropdown" aria-expanded="false">
                                        <i className="fa fa-user"></i> {houseOwnerName}
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="/houseowner/view">Dashboard</a>
                                        <a className="dropdown-item" href="/houseowner" onClick={logout}>Logout</a>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <div className="admin-dashboard">
                <h1>Just Add Your Rooms!!!</h1>
                <div className="image-container">
                    <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D " className="dashboard-image" />
                </div>
            </div>
        </div>
    );
};

export default HouseOwnerPage;
