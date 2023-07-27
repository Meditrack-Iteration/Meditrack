import React, { useState } from 'react';

const MedList = ({ medications, firstName, patientId }) => {
  
    const [patientsArray, setPatientsArray] = useState([]);
    
    const handleDeleteMedication = (medicationId) => {
    //post request sending
    const toDelete = {
      "patientId" : patientId,
      "medicationId": medicationId
    
    };
    console.log("patient id" , patientId)
    console.log("med id" , medicationId)
    fetch(`/api/removeMedication`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(toDelete),
      })


    }
    return(
        <div>
            {!medications.length && <span className="no-meds">No Medications to Show</span>}
            {(medications.length > 0) && medications.map((medication) => (
                <div>
                    <p>Name: {medication.name}</p>
                    <p>Dosage: {medication.dosage}</p>
                    <p>Frequency: {medication.frequency}</p>
                    <p>Directions: {medication.directions}</p>
                    <button  className = "deleteButton" onClick = {() => {
                      handleDeleteMedication(medication._id);
                    }}>Delete Medication</button>
                </div>
            )
            )}
        </div>
    );
}

export default MedList;