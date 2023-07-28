import React, {useEffect, useState} from 'react';
import PatientList from './PatientList';
import Navbar from './Navbar'
const Dashboard = props => {
    const [patientsArray, setPatientsArray] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [username, setUsername] = useState("")
    

    useEffect( () => {
        fetch(`/api/dashboard`)
        .then((data) => data.json()) 
        .then((data) => {
            setUsername(data.firstName);
            setPatientsArray(data.patients);
        })
        .catch(() => console.log("error in dashboard.js"))

    }, [patientsArray]);
    
    const handleAddPatient = () => {
        
            // let update = [...patientsArray];
            const newPatient = {
                firstName,
                lastName,
                age,
                weight
            }
        fetch(`/api/addPatient`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newPatient)//removed id temporarily JB 7/21
        }).then((data => {
            console.log(data)
            reloadPatients();
        }))
    }

    const reloadPatients = () => {
        fetch(`/api/dashboard`)
        .then((data) => data.json()) 
        .then((data) => {
            // console.log(data);
            setPatientsArray(data.patients);
        })
        // .then(data => console.log("log" ,data))
        .catch(() => console.log("got nothing"))
    }

    return (
        <div>
        <Navbar />
        <div className = 'dashboard-container'>
            <h2>Welcome, {username}!</h2>
            <h3 className="patients-header">Patients</h3>
            <div className="patients-container">
            {patientsArray && <PatientList className="patients-list"   patients = { patientsArray } handleAddPatient={handleAddPatient}></PatientList>}
            </div>
            <form className="form-input" id="add-patient-form" onSubmit={(event) => {
                event.preventDefault();
                handleAddPatient();
                }}>
                <span className="add-patient">Add Patient</span>
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
        </div>
    );
};

export default Dashboard;