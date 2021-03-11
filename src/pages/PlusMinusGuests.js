import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ApartmentContext } from '../contexts/ApartmentContextProvider'

export default function PlusMinusGuests() {
  const { id } = useParams()
  const { apartments } = useContext(ApartmentContext)
  const apartment = apartments.find(el => el._id === id)

  const [guests, setCount] = useState([
    { id: 0, currentValue: 1, maxValue: null, minValue: 1 },
    { id: 1, currentValue: 0, maxValue: null, minValue: 0 },
    { id: 2, currentValue: 0, maxValue: 5, minValue: 0 }
  ])

  const increment = (param) => {
    const newGuests = [...guests]
    const guest = newGuests.find(g => g.id === param)

    if (guest.id !== 2) guest.maxValue = apartment.maxGuests //max 5 infants

    const totalGuests = newGuests[0].currentValue + newGuests[1].currentValue // adults + kids can not exceed max amount guests

    if (guest.id === 2) {
      if (guest.currentValue < guest.maxValue) {
        guest.currentValue += 1;
      }
    } else if (totalGuests < guest.maxValue) {
      guest.currentValue += 1;
    }

    // SAME AS:
    // if (
    //   (guest.id === 2 && guest.currentValue < guest.maxValue)
    //   || (guest.id !== 2 && totalGuests < guest.maxValue)
    // ) {
    //   guest.currentValue += 1;
    // }

    setCount(newGuests)
  }

  const decrement = (param) => {
    const newGuests = [...guests]
    const guest = newGuests.find(g => g.id === param)

    if (guest.currentValue > guest.minValue)
      guest.currentValue -= 1;

    setCount(newGuests)
  }

  return (
    <>
      {apartment &&
        <div>
          <h3>How many guests you want to book?</h3>
          <p>Adults:
            <button onClick={() => decrement(0)}>-</button>
            {guests[0].currentValue}
            <button onClick={() => increment(0)} >+</button>
          </p>

          <p>Children (Age 2-12):
            <button onClick={() => decrement(1)}>-</button>
            {guests[1].currentValue}
            <button onClick={() => increment(1)} >+</button>
          </p>

          <p>Infants (Under 2):
            <button onClick={() => decrement(2)}>-</button>
            {guests[2].currentValue}
            <button onClick={() => increment(2)} >+</button>
          </p>

          <p><br />{apartment.maxGuests} guests maximum. <br />Infants don't count towards the the number of guests, but could affect final price. <br /> Max 5 infants.</p>
        </div>
      }
    </>
  )
}
