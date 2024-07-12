import React from 'react';
import Homerooms from '../assets/Homerooms.jpg';
import discover from '../assets/discover.jpg';
import Discover2 from '../assets/Discover2.jpg'

const Home = () => {
    return (
        <div>
            <div className="image-container-home">
                <img className='image-home' src={Homerooms} alt="Rooms" />
            </div>
            <div className='discover text-content'>
                <img src={discover} alt="Discover" className='left-image' />
                <div className='right-side'>
                    <h1>GUEST ROOMS</h1>
                    <p>The international Guru Guest House offers a wide range of hospitality options and you can able to book your most favourite rooms then that will help you to discover all the magic of the city that never ages.</p>
                    <center><button className="discover-button btn ">DISCOVER ALL</button></center>
                </div>
            </div>
            <div className='discover text-contents reverse'>
                <div className='left-side'>
                    <h1>GET GOOD FACILITIES</h1>
                    <p>There are a wide range of Residential Stay options available in Guru Guest Romms so through your stay & share good experience with us.</p>
                    <center><button className="discover-button btn ">DISCOVER ALL</button></center>
                </div>
                <img src={Discover2} alt="Discover" className='right-image' />
            </div>
        </div>
    );
}

export default Home;
