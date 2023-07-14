import React, { useState } from 'react';
import MedList from './MedList';

const Patient = ({ firstName, lastName, age, weight, medications }) => {
    
    const [showMeds, setShowMeds] = useState(false);
    const [addMeds, setAddMeds] = useState(false);
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [directions, setDirections] = useState('');
    const [sideEffects, setSideEffects] = useState('');
    // const [update, setUpdate] = useState([]);

    const handleShowMeds = (e) => {
        // e.preventDefault();
        setShowMeds(true);
    }

    const handleAddClick = () => {
        setAddMeds(true);
    }

    const handleAddMed = () => {
        const email = localStorage.getItem('email');

        const medication = {
            name,
            dosage,
            frequency,
            directions,
            sideEffects
        }

        let update = [];
        fetch(`/api/dashboard/${email}`)
        .then((data) => data.json()) 
        .then((data) => {
            update = [...data.patients]
            for (let i = 0; i < update.length; i++) {
                if (update[i].firstName === firstName) {
                    update[i].medications.push(medication);
                };
            }
            console.log('update', update);
            fetch(`/api/dashboard/patient`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, update })
            }).then((data => {
            console.log(data);
            }));
        })
        .catch(() => console.log("got nothing"))
    }
    
    return (
        <div className="patient">
            <h4>
            {firstName} {lastName}
            </h4>
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
            <button className="show-meds" onClick={(e) => {handleShowMeds()}}>Show Medications</button>
            {showMeds && <MedList medications={medications}/>}
            <br />
            <button className="add-med" onClick={(e) => {handleAddClick()}}>Add Medication</button>
            {addMeds && <div className="form-container">
            <form className="form-input" onSubmit={(event) => {
                event.preventDefault();
                handleAddMed();
                }}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                >
                </input>
                <input
                type="text"
                placeholder="Dosage"
                value={dosage}
                onChange={(e)=>setDosage(e.target.value)}
                >
                </input>
                <input
                type="text"
                placeholder="Frequency"
                value={frequency}
                onChange={(e)=>setFrequency(e.target.value)}
                >
                </input>
                <input
                type="text"
                placeholder="Directions"
                value={directions}
                onChange={(e)=>setDirections(e.target.value)}
                >
                </input>
                <input
                type="text"
                placeholder="Side Effects"
                value={sideEffects}
                onChange={(e)=>setSideEffects(e.target.value)}
                >
                </input><br></br>
                <input type="submit"></input>
            </form>
        </div>}
        </div>
    );
};

export default Patient;