import { useParams } from 'react-router-dom'
import { useContext } from 'react'
//import homes from '../components/homecomps/homestest.json';
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
export default function ApartmentDetails(props) {
    const { id } = useParams();
    const { apartments } = useContext(ApartmentContext)

    const apartment = apartments.find(a => a.id == id)
    
    console.log(id)
    console.log(apartment)
    console.log(apartments)
    return(
        
        <div>
        <h1>hejsan</h1>
        </div>
    )
}   