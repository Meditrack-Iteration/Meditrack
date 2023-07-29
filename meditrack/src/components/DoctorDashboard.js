import React, {useEffect, useState} from 'react';
import DoctorCard from './DoctorCard';
const DoctorDashboard = ({DocAppointArray})=>{

    return(
        <div>
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