import React, { useState } from 'react'
import Calendar from 'react-calendar'  // npm i react-calendar
import { useHistory } from 'react-router-dom'

export default function ReactCalendar({ userSearch }) {
  const history = useHistory()
  const [date, setDate] = useState() // date is array of 2 dates

  const onChange = newDate => {
    setDate(newDate)
  }

  function next() {
    history.push('/search/' + userSearch)
  }

  return (
    <div>
      <Calendar minDate={new Date()} onChange={onChange} value={date} selectRange={true} />
      <button onClick={next}>Next</button>
      <div>
        {date && date.map((d) => (
          <div key={d.toString()}>
            <h3>{ d.toString() }</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
