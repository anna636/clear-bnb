import { createContext, useState, useEffect } from "react";

export const AmenitiesContext = createContext()

export default function ApartmentContextProvider(props) {

    const [amenities, setAmenities] = useState([]);

    const fetchAmenities = async () => {
        let res = await fetch("/rest/amenities");
        res = await res.json();
        setAmenities(res);
      };

      useEffect(() => {

        fetchAmenities();
    
      }, []);
    
    
      const values = {
        amenities
      }
    
    
      return (
        <AmenitiesContext.Provider value={values}>
          {props.children}
        </AmenitiesContext.Provider>
      );

}