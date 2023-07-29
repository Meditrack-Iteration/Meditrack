import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Navbar from './Navbar'
const ScheduleReminders = () => {
  const [patientsArray, setPatientsArray] = useState([]);
  const [medList, setMedList] = useState([]);
  const [medicationName, setMedicationName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [numDoses, setNumDoses] = useState('');
  const [frequency, setFrequency] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedMedication, setSelectedMedication] = useState(null);

  useEffect(() => {
    fetch(`/api/dashboard`)
      .then((data) => data.json())
      .then((data) => {
        setPatientsArray(data.patients);
      })
      .catch(() => console.log('Error fetching patients'));
  }, []);

  const handleEnrollPatient = (e) => {
    e.preventDefault();

    if (!selectedPatient || !selectedMedication) {
      // Handle error: Patient or medication not selected
      return;
    }

    // Generate the dates array
    const dates = generateDateArray(startDate, numDoses, frequency);
    console.log(dates);

    for (let i = 0; i < patientsArray.length; i++) {
      if (patientsArray[i].firstName === selectedPatient) {
        patientsArray[i].futureIntake = { medicationName: selectedMedication, dates };
      }
    }

    const update = [...patientsArray];

    console.log('update', update);
    fetch(`/api/dashboard/patient`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ update }),
    }).catch(() => console.log('Error enrolling patient'));
  };

  function generateDateArray(startDate, numDoses, frequency) {
    const datesArr = [];

    for (let i = 0; i < numDoses; i++) {
      if (!datesArr.length) datesArr[0] = new Date(startDate);
      else {
        let date = new Date(datesArr[i - 1]);
        let hours = date.getHours() + Number(frequency);
        date.setHours(hours);
        datesArr.push(date);
      }
    }

    console.log(datesArr);
    return datesArr;
}

const handleSetPatient = (patient) => {
    setSelectedPatient(patient);
  
    const patientObj = patientsArray.find((p) => p.firstName === patient);
    if (patientObj) {
      setMedList(patientObj.medications);
    }
  };

  return (
    <>
    <Navbar/>

    <div className="reminder-container">
      <h1>Schedule Reminders</h1>
      <div className="form-container">
        <form className="form-input" onSubmit={handleEnrollPatient}>
          <label>
            Patient Name:&nbsp;&nbsp;
            <select value={selectedPatient} onChange={(e) => handleSetPatient(e.target.value)}>
              <option value="">Select Patient</option>
              {patientsArray.map((patient) => (
                <option key={patient.firstName} value={patient.firstName}>
                    {patient.firstName}
                </option>
              ))}
            </select>
          </label>
          
        
          <label>
            Medication Name:&nbsp;&nbsp;
            <select value={selectedMedication} onChange={(e) => setSelectedMedication(e.target.value)}>
                <option value="">Select Medication</option>    
                {medList.map((medication) => (
                    <option key={medication.name} value={medication.name}>
                        {medication.name}
                    </option> 
                ))}
            </select> 
        </label>



          
        <label>
            Start Date and Time:&nbsp;&nbsp;
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="Pp"
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              placeholderText="Start Date & Time"
            />
          </label>
          <label>
            Number of Doses:&nbsp;&nbsp;
            <input type="text" value={numDoses} onChange={(e) => setNumDoses(e.target.value)} />
          </label>
          <label>
            Frequency (in hours):&nbsp;&nbsp;
            <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
          </label>
          <label>
            Phone Number:&nbsp;&nbsp;
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
    </>
  );
};

export default ScheduleReminders;
