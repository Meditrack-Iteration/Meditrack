import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Signup = props => {
    
    const [errorMessage, setErrorMessage] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [docaccount, setDocaccount]=useState(false);
    const [urlstr, seturlstr]=useState("/api/signup");
    const navigate = useNavigate();

    const handleAccountType=(e)=>{
        e.preventDefault();
        let accounttype=e.currentTarget.getAttribute('value');
        if(accounttype==="doctor"){
            seturlstr("/api/signup/doctor");
            setDocaccount(true);
        }
        else{
            seturlstr("/api/signup");
            setDocaccount(false);
        }
    }

    const handleSignup = async(event) =>  { 
        event.preventDefault();
        try {
          const response = await fetch(urlstr, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
          });
      
          const responseData = await response.text();
          console.log('Response data:', responseData);
      
          if (response.ok) {
            const data = JSON.parse(responseData);
            console.log('check if response.ok is true',data);
            navigate(`/dashboard`);
          } else {
            setErrorMessage(true);
          }
        } catch (error) {
          console.error('Error during signup:', error.message);
          setErrorMessage(true);
        }
    };
    
    return(
        <div className="form-container">
            <form className="form-input" onSubmit={(event) => {
                event.preventDefault();
                handleSignup(event);
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                >
                </input><br></br>
                <input type="checkbox" id="checkbox" value="doctor" onChange={(e)=>{
                    handleAccountType(e);
                }}/>
                <label htmlFor="checkbox">I am a doctor</label>
                <input type="submit"></input>
            </form>
        </div>
    );
};

export default Signup;