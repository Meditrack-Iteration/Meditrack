import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

const Login = props => {
    
    const [errorMessage, setErrorMessage] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then((data) => {
            localStorage.setItem('username', username)
            console.log('hello');
            navigate(`/dashboard/${username}`)
        });
    };
    
    return(
        <div className="login-container">
            <form onSubmit={(event) => {
                event.preventDefault();
                handleLogin();
                console.log('hello')}}>
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

export default Login;