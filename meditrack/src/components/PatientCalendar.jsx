import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import Navbar from './Navbar'
import DatePicker from 'react-datepicker';

const PatientCalendar = props => {


  const events = [
    
  ];


  const [newEvent, setNewEvent] = useState({ title: "", start: null });
  const [allEvents, setAllEvents] = useState(events);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [patientsArray, setPatientsArray] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  console.log(allEvents)
  useEffect( () => {
    fetch(`/api/dashboard`)
    .then((data) => data.json()) 
    .then((data) => {
        setPatientsArray(data.patients);
        const events = data.patients.reduce((acc, patient) => {
          return acc.concat(
            patient.medicationLog.map((log) => ({
              title: log.medication,
              start: new Date(log.date),
              patientFirstName: patient.firstName,
            }))
          );
        }, []);
  
        setAllEvents(events);
    })
    .catch((err) => console.log("patientCalendar ",err))

}, []);

  const locales = {
    "en-US": require("date-fns/locale/en-US")
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  });

  const handleSelected = (e) => {
    console.log(e)
  }
  const handlePatientSelection = (patient) => {
    setSelectedPatient(patient);
    const filteredEvents = allEvents.filter((event) => event.patientFirstName === patient.firstName);
    setSelectedEvents(filteredEvents);
  };
  

  function handleAddEvent() {
    if (!newEvent.title || !newEvent.start) {
      return;
    }
  
    const eventPayload = {
      medication: newEvent.title,
      date: newEvent.start,
    };
  
    // Update allEvents
    setAllEvents([...allEvents, newEvent]);
  
    // Update selectedEvents
    setSelectedEvents([...selectedEvents, {
      title: newEvent.title,
      start: newEvent.start,
      patientFirstName: selectedPatient.firstName,
    }]);
  
    // const email = localStorage.getItem('email');
  //Below
    // let update = [];
    // fetch(`/api/dashboard`)
    //   .then((data) => data.json())
    //   .then((data) => {
    //     update = [...data.patients];
    //     for (let i = 0; i < update.length; i++) {
    //       if (update[i].firstName === selectedPatient.firstName) {
    //         update[i].medicationLog.push(eventPayload);
    //       }
    //     }
    //     console.log('update', update);
    //     fetch('/api/dashboard/patient', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ email, update })
    //     })
    //       .then(response => response.json())
    //       .then(data => {
    //         setNewEvent({ title: '', start: null });
    //       })
    //       .catch(error => {
    //         console.error("Could not process POST request");
    //       });
    //   });

    const medLog = {
      //patientId,medication, date, notes
      patientId : selectedPatient._id,
      medication : newEvent.title,
      date: newEvent.start,
      notes: "..."
    }
    fetch('/api/addMedicationLog', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(medLog)
          })
            // .then(response => response.json())
            .then(data => {
              setNewEvent({ title: '', start: null });
              console.log('returned from server - medication log', medLog)
            })
            .catch(error => {
              console.error("Could not process POST request");
            });
       

  };
  

  
    
  return (
    <>
    <Navbar/>
    <div className="med-calendar-container">
      <h1>Medicine Dosage Log</h1>
  
      <div>
        <h2 className="select-patient-header">Select Patient</h2>
        <select className="select-patient"
          value={selectedPatient?.firstName || ''}
          onChange={(e) => handlePatientSelection(patientsArray.find(p => p.firstName === e.target.value))}
        >
          <option value="">Select Patient</option>
          {patientsArray.map((patient) => (
            <option key={patient.firstName} value={patient.firstName}>{patient.firstName}</option>
          ))}
        </select>
      </div>
  
      {selectedPatient && selectedPatient.medications && (
        <>
          <h2 className="log-meds">Log Medication</h2>
          <div>
            <select className="select-medication"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            >
              <option value="">Select Medication</option>
              {selectedPatient.medications.map((medication) => (
                <option key={medication.name} value={medication.name}>{medication.name}</option>
              ))}
            </select>
            <div className="date-picker" style={{ position: 'relative', zIndex: 9999 }}>
              <DatePicker
                placeholderText='Date and Time'
                showTimeSelect
                dateFormat="Pp"
                style={{ marginRight: "10px", marginBottom: "10px" }}
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              />
            </div>
            <button className="med-cal-btn" style={{ marginTop: "10px" }} onClick={handleAddEvent}>Add Event</button>
          </div>
        </>
      )}
  
      <Calendar
        localizer={localizer}
        events={selectedEvents}
        startAccessor="start"
        endAccessor="start"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
    </>
  );
  
  
};

export default PatientCalendar;
