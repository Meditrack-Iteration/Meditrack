import React, {useEffect, useState} from 'react';

const Dashboard = props => {
    const {username} = props;
    const [patientsArray, setPatientsArray] = useState([]);
    const [update, setUpdate] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");

    // useEffect( () => {
    //     console.log("useEffect fetch")
    //     const email = localStorage.getItem('email');
    //     fetch(`/dashboard/${email}`)
    //     .then(data => data.json()) 
    //     .then(data => {
    //         setPatientsArray(data.patients);
    //     })
    //     // .then(data => console.log("log" ,data))
    //     .catch(() => console.log("got nothing"))

    // }, [])
    
    const handleAddPatient = () => {
        const email = localStorage.getItem('email');
        fetch(`/dashboard/${email}`)
        .then((data => {
            let tempArr = data.patientsArray;
            tempArr.push({
                firstName,
                lastName,
                age,
                weight
            })
            setUpdate(tempArr);
        }))
        fetch(`/dashboard/${email}/patient`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, update })
        })
    }

    return (
        <div className = 'dashboard-container'>
            <h2>Welcome {username}</h2>
            <form className="form-input" onSubmit={(event) => {
                event.preventDefault();
                handleAddPatient();
                }}>
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
                placeholder="Age"
                value={age}
                onChange={(e)=>setAge(e.target.value)}
                >
                </input>
                <input
                type="text"
                placeholder="Weight"
                value={weight}
                onChange={(e)=>setWeight(e.target.value)}
                >
                </input><br></br>
                <input type="submit"></input>
            </form>
        </div>
    );
};

export default Dashboard;