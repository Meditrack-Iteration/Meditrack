import React, { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import { add, format } from 'date-fns';

const DoctorCalendar = () => {
  const [date, setDate] = useState({ justDate: null, hoursMinutes: null });
  const [patientsArray, setPatientsArray] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [timesAvailable, setTimesAvailable] = useState([]);
  const [timeSelected, setTimeSelected] = useState(false);

  useEffect(() => {
    // const email = localStorage.getItem('email');
    fetch(`/api/dashboard`)
    // const email = localStorage.getItem('email');
    fetch(`/api/dashboard`)
      .then((data) => data.json())
      .then((data) => {
        setPatientsArray(data.patients);
      })
      .catch(() => console.log("got nothing"));

    fetch('/api/doctor')
      .then((data) => data.json())
      .then((data) => setDoctors(data))
      .catch(() => console.log("got nothing"));
  }, []);

  const minuteInterval=60;
  const startTime=9*60;
  const endTime=17*60;


  const getTimes = () => {
    if (!date.justDate || !selectedDoctor) return [];

    const { justDate } = date;

    const selectedDoctorData = doctors.find((doctor) => doctor.firstName === selectedDoctor.firstName);

    if (!selectedDoctorData || !selectedDoctorData.appointments) return [];

    const availableTimes = [];
    let currentTime = add(justDate, { minutes: startTime });

    while (currentTime <= add(justDate, { minutes: endTime })) {
      availableTimes.push(currentTime);
      currentTime = add(currentTime, { minutes: minuteInterval });
    }

    return availableTimes;
  };

  const handlePatientSelection = (patient) => {
    setSelectedPatient(patient);
    setDate({ justDate: null, hoursMinutes: null });
    setSelectedDoctor(null);
    setTimeSelected(false);
  };

  const handleDoctorSelection = (doctorName) => {
    const selectedDoctorData = doctors.find((doctor) => doctor.firstName === doctorName);
    setSelectedDoctor(selectedDoctorData);

    if (selectedDoctorData && date.justDate) {
      const formattedDate = format(date.justDate, 'yyyy-MM-dd');
      const availableTimes = getTimes()
        .filter((time) => format(time, 'yyyy-MM-dd') === formattedDate)
        .map((time) => add(date.justDate, { hours: time.getHours(), minutes: time.getMinutes() }));
      setTimesAvailable(availableTimes);
    } else {
      setTimesAvailable([]);
    }
  };

  const handleScheduleAppointment = async () => {
    if (!selectedPatient || !date.hoursMinutes || !selectedDoctor) return;

  // Extract the hours and minutes from date.hoursMinutes
  const { justDate, hoursMinutes } = date;
  const selectedTime = new Date(justDate);

  selectedTime.setUTCHours(hoursMinutes.getHours());
  selectedTime.setUTCMinutes(hoursMinutes.getMinutes());

    try{

      //first check if appDateTime exists in doctor object, if not, update, if yes, return error.
      const availability=await fetch('/api/doctor/appointment',{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({appointments: selectedTime, firstName:selectedDoctor.firstName, patient:selectedPatient.firstName}),
      })
      const data=await availability.json();
      console.log('availability is ',data.available);
      if(data.available){
        setTimeSelected(true);
      }
      else{
        alert('the selected time is not available, please choose a different time')
      }

    }
    catch(err){
      console.log('appointmenthandler error!',err);
    }
    // fetch(`/api/doctors/${selectedDoctor._id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ hoursAvailable: updatedHoursAvailable }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle success response
    //     console.log('Appointment scheduled successfully');
    //     setTimeSelected(true);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error('Error scheduling appointment:', error);
    //   });

    // setTimeSelected(true);

  };

  return (
    <div>
      <h1>Doctor Calendar</h1>

      <div>
        <h2>Select Patient</h2>
        <select className="select-patient"
          value={selectedPatient?.firstName || ''}
          onChange={(e) => handlePatientSelection(patientsArray.find((p) => p.firstName === e.target.value))}
        >
          <option value="">Select Patient</option>
          {patientsArray.map((patient) => (
            <option key={patient.firstName} value={patient.firstName}>
              {patient.firstName}
            </option>
          ))}
        </select>
      </div>

      {selectedPatient && !timeSelected && (
        <>
          <h2>Select Doctor</h2>
          <select className="select-patient"
            value={selectedDoctor?.firstName || ''}
            onChange={(e) => handleDoctorSelection(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.firstName} value={doctor.firstName}>
                {doctor.firstName}
              </option>
            ))}
          </select>

          {selectedDoctor && (
            <>
              <h2>Schedule Appointment</h2>
              <div>
                <p>Selected Patient: {selectedPatient.firstName}</p>
                {date.justDate && (
                  <>
                    <p>Selected Date: {format(date.justDate, 'MM/dd/yyyy')}</p>
                    <p>Select Time:</p>
                    <div>

                      {timesAvailable.map((time, i) => (
                        <div key={`time-${i}`}>
                          <button
                            style={{borderColor: "pink"}}
                            className="time-btn"
                            onClick={() => {
                              setDate((prev) => ({
                                ...prev,
                                hoursMinutes: time,
                              }));
                            }}
                          >
                            {format(time, 'hh:mm')}
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className="schedule-btn" style={{ marginTop: '10px' }} onClick={handleScheduleAppointment}>
                      Schedule Appointment
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}

      {timeSelected && (
        <div>
          <h2>Appointment Scheduled!</h2>
        </div>
      )}
      {
        !timeSelected && (
          <div>
            <h2>Please select a different time</h2>
          </div>
        )
      }

      {!selectedPatient && !timeSelected && (
        <div>
          <p>Please select a patient.</p>
        </div>
      )}

      {!selectedDoctor && !timeSelected && (
        <div>
          <p>Please select a doctor.</p>
        </div>
      )}

      {!timeSelected && (
        <ReactCalendar
          minDate={new Date()}
          className="react-calendar"
          view="month"
          onClickDay={(selectedDate) => {
            setDate((prev) => ({
              ...prev,
              justDate: selectedDate,
              hoursMinutes: null,
            }));
            handleDoctorSelection(selectedDoctor?.firstName);
          }}
        />
      )}
    </div>
  );
};

export default DoctorCalendar;