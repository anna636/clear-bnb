import { useParams } from 'react-router-dom'
import { useContext } from 'react'
// import homes from '../components/homecomps/homestest.json';
import { ApartmentContext } from '../contexts/ApartmentContextProvider'

export default function HouseDetails(props){
    const { id } = useParams();

    return(
        <div>
            <h1> hejsan </h1>
            <p>{id}</p>
        </div>
    )
}