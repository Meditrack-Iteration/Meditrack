import React from 'react';

const Patient = ({ firstName, lastName, age, weight }) => {
    // console.log(props);
    console.log('first name', firstName);
    return (
        <div className="patient">
            <h4>
            {firstName} {lastName}
            </h4>
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
            <button>Show Medications</button>
            {/* <MedLog />
            <FutureIntake /> */}
        </div>
    );
};

export default Patient;