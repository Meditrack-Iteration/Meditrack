import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

const Login = props => {
    
    const [errorMessage, setErrorMessage] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then((data) => {
            localStorage.setItem('email', email)
            console.log('hello');
            navigate(`/dashboard/${email}`)
        });
    };
    
    return(
        <div className="form-container">
            <form className="form-input" onSubmit={(event) => {
                event.preventDefault();
                handleLogin();
                console.log('hello')}}>
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
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