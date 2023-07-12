import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import DatePicker from 'react-datepicker';
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";

const PatientCalendar = props => {
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

  const events = [
    {
      title: "Flonase",
      allDay: false,
      start: new Date(2023, 6, 8, 9, 30),
    }
  ];

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  const [newEvent, setNewEvent] = useState({ title: "", start: null });
  const [allEvents, setAllEvents] = useState(events);

  return (
    <div>
      <h1>Medicine Dosage Log</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder='Add Title'
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => { setNewEvent({ ...newEvent, title: e.target.value }) }}
        />
        <div style={{ position: 'relative', zIndex: 9999 }}>

        <DatePicker
          placeholderText='Date and Time'
          showTimeSelect
          dateFormat="Pp"
          style={{ marginRight: "10px", marginBottom: "10px"}}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        </div>
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>Add Event</button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="start" // Set the endAccessor to the same value as startAccessor
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default PatientCalendar;
