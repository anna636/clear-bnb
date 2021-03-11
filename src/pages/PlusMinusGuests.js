import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ApartmentContext } from '../contexts/ApartmentContextProvider'

export default function PlusMinusGuests() {
  const { id } = useParams()
  const { apartments } = useContext(ApartmentContext)
  const apartment = apartments.find(el => el._id === id)

  const [guests, setCount] = useState([
    { id: 0, currentValue: 1, maxValue: null, minValue: 1, disabled: false },
    { id: 1, currentValue: 0, maxValue: null, minValue: 0, disabled: false },
    { id: 2, currentValue: 0, maxValue: 5, minValue: 0 }
  ])

  const decrButtonHandler = (param) => {
    const newGuests = [...guests]
    newGuests[param].currentValue -= 1
    setCount(newGuests)
  }

  const incrButtonHandler = (param) => {
    const newGuests = [...guests]
    newGuests[param].currentValue += 1
    setCount(newGuests)
  }

  const decrButtonEnableDisable = param => {
    const guest = guests[param]
    return guest.currentValue <= guest.minValue ? true : false
  }

  const incrButtonEnableDisable = param => {

    const guest = guests[param]
    if (guest.id !== 2) guest.maxValue = apartment.maxGuests //max 5 infants

    const totalGuests = guests[0].currentValue + guests[1].currentValue // adults + kids can not exceed max amount guests

    if (guest.id === 2) {
      if (guest.currentValue < guest.maxValue) {
        return false;
      } else {
        return true;
      }
    } else if (totalGuests < guest.maxValue) {
      return false;
    } else {
      return true;
    }
  }


  return (
    <>
      {apartment &&
        <div>
          <h3>How many guests you want to book?</h3>
          <p>Adults:
            <button
              onClick={() => decrButtonHandler(0)}
              disabled={decrButtonEnableDisable(0)}
            >
              -
            </button>

            {guests[0].currentValue}

            <button
              onClick={() => incrButtonHandler(0)}
              disabled={incrButtonEnableDisable(0)}
            >
              +
            </button>
          </p>

          <p>Children (Age 2-12):
            <button
              onClick={() => decrButtonHandler(1)}
              disabled={decrButtonEnableDisable(1)}
            >
              -
            </button>
            {guests[1].currentValue}
            <button
              onClick={() => incrButtonHandler(1)}
              disabled={incrButtonEnableDisable(1)}
            >
              +
            </button>
          </p>



          <p>Infants (Under 2):
            <button
              onClick={() => decrButtonHandler(2)}
              disabled={decrButtonEnableDisable(2)}
            >
              -
            </button>
            {guests[2].currentValue}
            <button
              onClick={() => incrButtonHandler(2)}
              disabled={incrButtonEnableDisable(2)}
            >
              +
            </button>
          </p>

          <p><br />{apartment.maxGuests} guests maximum. <br />Infants don't count towards the the number of guests, but could affect final price. <br /> Max 5 infants.</p>
        </div>
      }
    </>
  )
}
