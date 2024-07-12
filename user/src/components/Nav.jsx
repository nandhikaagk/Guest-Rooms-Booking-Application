import React from 'react';
import logo from '../assets/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Nav = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" className="logo" />
                    <span style={{ color: 'white', marginLeft: '20px' }}>Guru Guest Houses</span>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav adjust ">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/gallery">Gallery</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/Main">Guest Rooms</a>
                        </li>
                        {user ? (
                            <li className="nav-item dropdown">
                                <button className="btn drop dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-user"></i> {user.name}
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                                    <a className="dropdown-item" href="/bookings">Bookings</a>
                                </div>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>

                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Nav;

