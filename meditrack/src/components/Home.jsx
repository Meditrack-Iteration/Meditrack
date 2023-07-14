import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../logo.png';
import './Home.css';

// need to implement the gradient text

const Home = () => {
    return(
        <div className="homepage-container">
            <h1>MediTrack</h1>
            <h3>Please <Link className="link" to="/login">login</Link> or <Link className="link" to="signup">signup</Link> to continue</h3>
            <div className="home section__padding" id="volunteer">
            <div className="home-image">
            <img src={logo} alt="Social Determinents of Health" />
            </div>
            <div className="home-content">
            <h1 className="gradient__text">Seamlessly Manage Your <br /> Medication Journey</h1>
            <p>Fridays and Saturdays can be the toughest  adherence days of the week. Meditrack's system enables targeted and personalized notifications to improve adherence.</p>
            </div>
        </div>
         </div>
    );


}



export default Home;
