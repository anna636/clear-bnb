import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { ApartmentContext } from '../contexts/ApartmentContextProvider'

export default function PlusMinusGuests() {
  const { id } = useParams()
  const { apartments } = useContext(ApartmentContext)
  const apartment = apartments.find(el => el._id === id)
  const defaultGuests = 1

  console.log(id, apartment)

  return (
    <>
      { apartment &&
        <div>
          {/* <p>How many guests you want to book?</p>
          <p>

          </p> */}
          {apartment.maxGuests}
        </div>
      }
    </>
  )
}
