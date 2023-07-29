import React, {useEffect, useState} from 'react';
import DoctorCard from './DoctorCard';
import './doctordashboard.css';
const DoctorDashboard = ({DocAppointArray})=>{

    return(

<div classname="doctordashboard">
                    <h1>Appointments</h1>


        {
            DocAppointArray.map((appointment,id)=>(
                <DoctorCard
                className="appointment"
                key={id+1}
                patientName={appointment.patientName}
                appointmentTime={appointment.appointmentTime}
                />
            )   
            )
        }

</div>

    )
}
export default DoctorDashboard;