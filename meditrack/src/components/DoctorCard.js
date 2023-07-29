import React, {useEffect, useState} from 'react';

const DoctorCard = ({patientName, appointmentTime})=>{

    return(
        <div className='appointmentCard'>
            <h1>{patientName}</h1>
            <h2>{appointmentTime}</h2>
        </div>
    )
}
export default DoctorCard;