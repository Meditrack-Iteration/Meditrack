import React, { useState } from 'react';
import MedList from './MedList';

const Patient = ({ firstName, lastName, age, weight, medications, patientId }) => {
  const [addMeds, setAddMeds] = useState(false);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [directions, setDirections] = useState('');
  const [showMeds, setShowMeds] = useState(false);
  const [medListKey, setMedListKey] = useState(0);

  const handleShowMeds = (e) => {
    e.preventDefault();
    setShowMeds((prevShowMeds) => !prevShowMeds);
  };

  const handleAddClick = () => {
    setAddMeds(!addMeds);
  };

  // const handleAddMed = () => {
  //   const email = localStorage.getItem('email');

  //   const medication = {
  //     name,
  //     dosage,
  //     frequency,
  //     directions,
  //   };

  //   fetch(`/api/dashboard/${email}`)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       const update = data.patients.map((patient) => {
  //         if (patient.firstName === firstName) {
  //           return {
  //             ...patient,
  //             medications: [...patient.medications, medication],
  //           };
  //         }
  //         return patient;
  //       });

  //       console.log('update', update);

  //       fetch(`/api/dashboard/patient`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-type': 'application/json',
  //         },
  //         body: JSON.stringify({ email, update }),
  //       })
  //         .then((data) => {
  //           console.log(data);
  //         })
  //         .catch((error) => console.log(error));
  //     })
  //     .catch(() => console.log('got nothing'));

  //   // setMedListKey((prevKey) => prevKey + 1);

  //   setName('');
  //   setDosage('');
  //   setFrequency('');
  //   setDirections('');
  // };
  const handleDeletePatient = () => {
    //post request sending
    const toDelete = {"patientId" : patientId};
    fetch(`/api/removePatient`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(toDelete),
      })



  }
  const handleAddMed = () =>{
    const medication = {
        "name":name,
        "dosage":dosage,
        "frequency":frequency,
        "directions":directions,
        "patientId" : patientId
    };

    fetch(`/api/addMedication`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(medication),
      })
      .then(data => {
          console.log(medication);
      })
      .catch(() => console.log('got nothing'));
  }
  return (
    <div className="patient">
      {/* Patient Info */}
      <h4>
        {firstName} {lastName}
      </h4>
      <p>Age: {age}</p>
      <p>Weight: {weight}</p>
      {/* Show Medications */}
      <button className="show-meds" onClick={handleShowMeds}>
        {showMeds ? 'Hide Medications' : 'Show Medications'}
      </button>
      {showMeds && <MedList key={medListKey} medications={medications} firstName={firstName} patientId = {patientId}/>}
      {/* Add Medication */}
      <button className="add-med" onClick={handleAddClick}>
      {addMeds ? 'Collapse Add Medication' : 'Add Medication'}
      </button>
      {addMeds && (
        <div className="form-container">
          <form
            className="form-input"
            onSubmit={(event) => {
              event.preventDefault();
              handleAddMed();
            }}
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
            <input
              type="text"
              placeholder="Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <input
              type="text"
              placeholder="Directions"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
            />
            <br />
            <input type="submit" />
          </form>
        </div>
      )}
      {/* Delete Medication */}
      <button className = "deleteButton" onClick = {handleDeletePatient}>Delete {firstName}</button>
    </div>
  );
};

export default Patient;
