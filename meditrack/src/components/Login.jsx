import { render } from '@testing-library/react';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'

const Login = props => {
    
    const [errorMessage, setErrorMessage] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [docaccount, setDocaccount]=useState(false);
    const [urlstr, seturlstr]=useState("/api/login");

    const navigate = useNavigate();

    
    
    const handleAccountType=(e)=>{
        e.preventDefault();
        let accounttype=e.currentTarget.getAttribute('value');
        if(accounttype==="doctoraccount"){
            seturlstr("/api/login/doctor");
            setDocaccount(true);
        }
        else{
            seturlstr("/api/login");
            setDocaccount(false);
        }
    }

    const handleLogin = () => {
        
        fetch(urlstr, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then((data) => {

            // const jsondata=data.json();
            if (data.ok) {
                console.log('i am in handleLogin for doctor',data);
                return data.json();}
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
                <input type="checkbox" id="doctorcheck" value="doctoraccount" onChange={(e)=>{handleAccountType(e)}}/>
                <label htmlFor="doctorcheck">i am a doctor</label>

                <input type="submit"></input>
            </form>
            {errorMessage && <p className="login-error">Email or password is incorrect!</p>}
            {/* {userData ? <p>{[userData]}</p> : <p></p>} */}
        </div>
    );
};

export default Login;