import { useState, useEffect } from 'react'

const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const years = [2021, 2022]

const Calendar = () => {
  // emit close calendar module!!!

  useEffect(() => {
    setMonths(year)

    console.log(monthsOfYear[0])

    // return () => {
    //   // Perhaps emit here?
    //   console.log('Unmounted')
    // }
  }, [])

  let today = new Date().toJSON().slice(0, 10).replace(/-/g, "/")  // Todays date in yyyy/mm/dd 
  let thisMonth = new Date().getMonth() + 1
  let thisYear = new Date().getFullYear()
  const [monthsOfYear, setMonthsOfYear] = useState([])

  const [day, setDay] = useState(1)
  const [month, setMonth] = useState('')
  const [year, setYear] = useState(thisYear)

  // Doesn't allow months from the past
  function setMonths(year) {
    setMonthsOfYear([])
    months.forEach(month => {
      if (year === thisYear && (months.indexOf(month) + 1) >= thisMonth) {
        setMonthsOfYear(oldArray => [...oldArray, month])
      }
      else if (year !== thisYear) {
        setMonthsOfYear(oldArray => [...oldArray, month])
      }
    })
    console.log('setMonthsOfYear working: ', monthsOfYear[0])
  }

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <form>
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {days.map((day) => (
            <option key={day}>{day}</option>
          ))}
        </select>
        <p>{day}</p>
        <select required value={month} onChange={(e) => setMonth(e.target.value)} >
          {monthsOfYear.length && monthsOfYear.map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>
        <p>{month}</p>
        <select value={year} onChange={e => { setYear(e.target.value); setMonths(e.target.value) }}>
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <p>{year}</p>
      </form>
    </div>
  );
}

export default Calendar;