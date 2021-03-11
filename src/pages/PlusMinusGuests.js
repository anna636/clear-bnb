import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { ApartmentContext } from '../contexts/ApartmentContextProvider'

export default function PlusMinusGuests() {
  const { id } = useParams()
  const { apartments } = useContext(ApartmentContext)
  const apartment = apartments.find(el => el._id === id)

  console.log(id, apartment)

  return (
    <div>
      <p>see if it works?
      {/* {apartment.maxGuests} */}
      </p>
    </div>
  )
}
