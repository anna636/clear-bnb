import { CreateNewApartment } from '../components/apartmentListing'
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";


export default function ApartmentListing() {
    const { getCurrentUser } = useContext(UserContext);


    return (
        < div className="createNewAptWrapper" >
            {getCurrentUser() && <CreateNewApartment />}
            {!getCurrentUser() &&
                <h1>You need to be logged in to list an apartment.</h1>}
        </div >
    )
}