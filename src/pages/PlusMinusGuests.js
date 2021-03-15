import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import '../css/PlusMinusGuests.css'

export default function PlusMinusGuests() {
  const { id } = useParams()
  const { apartments } = useContext(ApartmentContext)
  const apartment = apartments.find(el => el._id === id)

  const [guests, setCount] = useState([
    { id: 0, currentValue: 1, maxValue: null, minValue: 1 },
    { id: 1, currentValue: 0, maxValue: null, minValue: 0 },
    { id: 2, currentValue: 0, maxValue: 5, minValue: 0 }
  ])

  const buttonHandler = (param, operator) => {
    const newGuests = [...guests]
    operator === 'decr' ? newGuests[param].currentValue -= 1 : newGuests[param].currentValue += 1
    setCount(newGuests)
  }

  const decrButtonEnableDisable = (param) => {
    const guest = guests[param]
    return guest.currentValue <= guest.minValue ? true : false
  }

  const incrButtonEnableDisable = (param) => {
    const guest = guests[param]
    if (guest.id !== 2) guest.maxValue = apartment.maxGuests //max 5 infants

    const totalGuests = guests[0].currentValue + guests[1].currentValue // adults + kids can not exceed max amount guests

    if (guest.id === 2) {
      return guest.currentValue < guest.maxValue ? false : true;
    } else
      return totalGuests < guest.maxValue ? false : true
  }


  return (
    <>
      {apartment &&
        <div className="container">
          <h3>Choose amount of guests.</h3>
          <div className="wrapper">
            <div className="content-left">Adults: </div>
            <div className="buttons-right">
              <button
                onClick={() => buttonHandler(0, 'decr')} disabled={decrButtonEnableDisable(0)}
                style={decrButtonEnableDisable(0) ? styles.notAllowed : styles.regular}
              >
                -
            </button>
              <span>{guests[0].currentValue}</span>
              <button
                onClick={() => buttonHandler(0, 'incr')} disabled={incrButtonEnableDisable(0)}
                style={incrButtonEnableDisable(0) ? styles.notAllowed : styles.regular}
              >
                +
            </button>
            </div>


            <div className="content-left">Children <br />(Age 2-12): </div>
            <div className="buttons-right">
              <button
                onClick={() => buttonHandler(1, 'decr')} disabled={decrButtonEnableDisable(1)}
                style={decrButtonEnableDisable(1) ? styles.notAllowed : styles.regular}
              >
                -
            </button>
              <span>{guests[1].currentValue}</span>
              <button
                onClick={() => buttonHandler(1, 'incr')} disabled={incrButtonEnableDisable(1)}
                style={incrButtonEnableDisable(1) ? styles.notAllowed : styles.regular}
              >
                +
            </button>
            </div>


            <div className="content-left">Infants <br />(Under 2):</div>
            <div className="buttons-right">
              <button
                onClick={() => buttonHandler(2, 'decr')} disabled={decrButtonEnableDisable(2)}
                style={decrButtonEnableDisable(2) ? styles.notAllowed : styles.regular}
              >
                -
            </button>
              <span>{guests[2].currentValue}</span>
              <button
                onClick={() => buttonHandler(2, 'incr')} disabled={incrButtonEnableDisable(2)}
                style={incrButtonEnableDisable(2) ? styles.notAllowed : styles.regular}
              >
                +
            </button>
            </div>
          </div> {/* end of wrapper div */}
          <div className="content-under"><p>{apartment.maxGuests} guests maximum. </p><p>Infants don't count towards the the number of guests, but could affect final price. </p>
            <button id="cancel">Cancel</button>
            <button id="save">Save</button>
          </div>
        </div> // end of container div
      }
    </>
  )
}

const styles = {
  notAllowed: {
    cursor: 'not-allowed',
    opacity: '40%'

  },
  regular: {
    cursor: 'pointer',
    opacity: '100%'
  }
}