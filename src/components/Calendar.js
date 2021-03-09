// import useEffect and put a todays date checker in it

const Calendar = () => {
  return (
    <div className="calendar">
      <form>
        <h1>Calendar</h1>
        <select>
          {testArray.map((number) => (
            <option key={number}>{number}</option>
          ))}
        </select>
      </form>
    </div>
  );
}

const testArray = [1, 2, 3, 4, 5]
 
export default Calendar;