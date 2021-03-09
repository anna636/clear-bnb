import { useParams } from 'react-router-dom'
import { useContext } from 'react'
//import homes from '../components/homecomps/homestest.json';
import { ApartmentContext } from '../contexts/ApartmentContextProvider'
import ApartmentList from "../components/ApartmentList";

export default function HouseDetails(props) {
    const { city } = useParams();
    const { apartments } = useContext(ApartmentContext)
    
    return(
        <div>
        <h1>hejsan</h1>
        <ApartmentList apartments={apartments.filter((apartment) => apartment.city.toLowerCase() === city)} />
        </div>
    )
}   