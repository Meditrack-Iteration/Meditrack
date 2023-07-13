import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    return(
        <div className="homepage-container">
            <h1>Meditrack</h1>
            <h3>Please <Link className="link" to="/login">login</Link> or <Link className="link" to="signup">signup</Link> to continue</h3>
        </div>
    );
}

export default Home;