import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import { add, format } from 'date-fns';

const DoctorCalendar = props => {

    const [date, setDate] = useState(
        {justDate: null,
        dateTime: null}
    )

    const getTimes = () => {
        if (!date.justDate) return;

        const { justDate } = date;

        const beginning = add(justDate, {hours: 9});
        const end = add(justDate, {hours: 17});
        const interval = 30;

        const times = [];

        for (let i = beginning; i <= end; i = add(i, {minutes: interval})) {
            times.push(i);
        }

        return times;
    }

    const times = getTimes();

    return(
    <div>
       {date.justDate ? <div>
        {times.map((time, i) => (
            <div key={`time-${i}`}>
                <button onClick={() => setDate((prev) => ({...prev, dateTime: time}))}>
                    {format(time, 'hh:mm')}
                </button>
                
            </div>
        ))}
       </div> : <ReactCalendar minDate={new Date()}
        className="react-calendar" 
        view="month"
        onClickDay={(date) => setDate((prev) =>  ({...prev, justDate: date}))}
        /> }
    </div>
    );
}

export default DoctorCalendar;