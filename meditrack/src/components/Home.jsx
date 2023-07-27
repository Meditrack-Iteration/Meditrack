import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import logo from '../logo.png';
import './Home.css';
const CLIENT_ID = "1f252291952872a24f19"

// need to implement the gradient text

const Home = () => {
    const [userData, setUserData] = useState([])
    const [rerender, setRerender] = useState(false)

    useEffect(()=> {
        const urlParams = new URLSearchParams(document.location.search)
        const codeParam = urlParams.get("code")
        console.log("this is a code param", codeParam)

        if(codeParam && (localStorage.getItem("accessToken") === null)){
            console.log("before making call to /getAccessToken")
            async function getAccessToken(){
                await fetch("/api/getAccessToken?code=" + codeParam, {
                    method: "GET"
                }).then((response) =>{
                    return response.json();
                }).then((data)=>{
                    console.log(data);
                    if(data.access_token){
                        localStorage.setItem("accessToken", data.access_token)
                        setRerender(!rerender)
                    }
                })
            }
        getAccessToken();
        }
    }, [rerender])

    async function getUserData() {
        console.log("before fetching user data")
        await fetch("/api/getUserData", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }).then((response) =>{
            return response.json();
        }).then((data) =>{
            console.log(data);
            setUserData(data);
            setRerender(!rerender);
        })
    }

    function loginWithGithub() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
      }

    return(
        <div className="homepage-container">
            <h1>MediTrack</h1>
            <h3>Please <Link className="link" to="/login">login</Link> or <Link className="link" to="signup">signup</Link> to continue</h3>
            <button onClick={loginWithGithub}>Login with Github</button>
            <button onClick={getUserData}>get user data</button>
            <div className="home section__padding">
            <div className="home-image">
            <img src={logo} alt="logo" />
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
