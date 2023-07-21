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
            if (data.ok) return data.json()
            else {
                setErrorMessage(true)};
                throw new Error ({err: 'login credntials are incorrect'});
        }).then((data) => {
            if (data._id){
                navigate(`/dashboard`);
            }
        }).catch((Error) => {
            console.log(Error)
        })
        // .then((data) => {
        //     if (data.ok) {

        //     } else console.log('data not ok!')
        // });
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
            {errorMessage && <p className="login-error">Email or password is incorrect!</p>}
        </div>
    );
};

export default Login;