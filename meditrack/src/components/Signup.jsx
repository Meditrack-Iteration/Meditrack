import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = props => {
    
    const [errorMessage, setErrorMessage] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, username, email, password })
        }).then((data) => {
            localStorage.setItem('username', username)
            console.log('hello');
            navigate(`/dashboard/${username}`)
        });
    };
    
    return(
        <div className="signup-container">
            <form onSubmit={(event) => {
                event.preventDefault();
                handleSignup();
                console.log('hello')}}>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                >
                </input>
                <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                >
                </input>
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                >
                </input>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                >
                </input>
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                >
                </input><br></br>
                <input type="submit"></input>
            </form>
        </div>
    );
};

export default Signup;