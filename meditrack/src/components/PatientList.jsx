import React from 'react';
import Patient from './Patient'

const PatientList = props => {
    const { patients, title } = props;
    return (
        <div className="patients-list">
            { title }
            { patients.map((patient) =>
               (
               <Patient
               className="patient"
               key={patient._id}     
               firstName={patient.firstName}
                lastName={patient.lastName}
                age={patient.age}
                weight={patient.weight}
               />)

               
            )}
        </div>

    )
}

export default PatientList;