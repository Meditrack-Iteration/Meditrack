import React from 'react';

const MedList = ({ medications }) => {
    return(
        <div>
            {!medications.length && <span className="no-meds">No Medications to Show</span>}
            {(medications.length > 0) && medications.map((medication) => (
                <div>
                    <p>Name: {medication.name}</p>
                    <p>Dosage: {medication.dosage}</p>
                    <p>Frequency: {medication.frequency}</p>
                    <p>Directions: {medication.directions}</p>
                    <p>Side Effects: {medication.sideEffects}</p>
                </div>
            )
            )}
        </div>
    );
}

export default MedList;