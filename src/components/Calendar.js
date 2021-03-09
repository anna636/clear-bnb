const Calendar = () => {
  
  let today = new Date().toJSON().slice(0, 10).replace(/-/g, "/")  // Todays date in yyyy/mm/dd 
  console.log(today)
  let thisMonth = new Date().getMonth() + 1
  let thisYear = new Date().getFullYear()


  function monthsOfYear(year) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let monthsOfYear = []
    months.forEach(month => {
      if (year === thisYear && (months.indexOf(month) + 1) >= thisMonth) {
        monthsOfYear.push(month)
        console.log(month)
      }
      else if (year != thisYear) {
        monthsOfYear.push(month)
      }
    })
    return monthsOfYear
  }

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <form>
        <select>
          {days.map((day) => (
            <option key={day}>{day}</option>
          ))}
        </select>
        <select>
          {monthsOfYear(thisYear).map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>
        <select>
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </form>
    </div>
  );
}


const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
const years = [2021, 2022]

export default Calendar;