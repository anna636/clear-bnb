import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const years = [2021, 2022]
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

const Calendar = ({ userSearch }) => {
  // emit close calendar module!!! Take in location prop

  const history = useHistory()
  let today = new Date().toJSON().slice(0, 10).replace(/-/g, "/")  // Todays date in yyyy/mm/dd 
  let thisMonth = new Date().getMonth() + 1
  let thisYear = new Date().getFullYear()
  const [monthsOfYear, setMonthsOfYear] = useState([])

  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(monthsOfYear[0])
  const [year, setYear] = useState(thisYear)
  const [nights, setNights] = useState(1)

  useEffect(() => {

    // Not working atm!! monthsOfYear[0] is undefined at component startup. Need to add async or something..
    setMonths(year)

    console.log(monthsOfYear[0])
  }, [])

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

  const nextButton = async e => {
    e.preventDefault()

    // const bookingDetails = {
    //   title: title.current.value,
    //   ingredients: ingredients.current.value,
    //   imageUrl: imageUrl.current.value
    // }

    // console.log(bookingDetails)

    // await addRecipe(recipe)

    history.push('/search/' + userSearch) // Search by city or region you type in search

  }

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <form onSubmit={nextButton}>
        <p>Day: </p>
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {days.map((dy) => (
            <option key={dy}>{dy}</option>
          ))}
        </select>
        <p>{day}</p>
        <p>Month: </p>
        <select required value={month} onChange={(e) => setMonth(e.target.value)} >
          {monthsOfYear.length && monthsOfYear.map((mnth) => (
            <option key={mnth}>{mnth}</option>
          ))}
        </select>
        <p>{month}</p>
        <p>Year: </p>
        <select value={year} onChange={e => { setYear(e.target.value); setMonths(e.target.value) }}>
          {years.map((yr) => (
            <option key={yr}>{yr}</option>
          ))}
        </select>
        <p>{year}</p>
        <p>Number of nights: </p>
        <select value={nights} onChange={(e) => setNights(e.target.value)}>
          {numbers.map((nr) => (
            <option key={nr}>{nr}</option>
          ))}
        </select>
        <p>{nights}</p>
        <button>Next</button>
      </form>
    </div>
  );
}

export default Calendar;