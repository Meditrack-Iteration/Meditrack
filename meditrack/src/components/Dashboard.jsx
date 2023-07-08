import React, {useEffect, useState} from 'react';

const Dashboard = props => {
    const {username} = props;
    const [patientsArray, setPatientsArray] = useState([]);

    useEffect( () => {
        console.log("useEffect fetch")
        const username = localStorage.getItem('username');
        fetch(`/dashboard/${username}`)
        .then(data => data.json()) 
        .then(data => {
            setPatientsArray(data.patients);
        })
        // .then(data => console.log("log" ,data))
        .catch(() => console.log("got nothing"))

    }, [])
    


    return (
        <div className = 'dashboard-container'>
            <h2>Welcome {username}</h2>
            <button>Add Patient</button>
        </div>
    );
};

export default Dashboard;