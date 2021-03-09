import { createContext, useState, useEffect } from "react";

export const ApartmentContext=createContext()

export default function ApartmentContextProvider(props) {

  const [apartments, setApartments] = useState([]);

   const fetchApartments = async () => {
     let res = await fetch("/rest/apartments");
     res = await res.json();
     setApartments(res);
   };

  useEffect(() => {
    
    fetchApartments();
  }, []);


  const values = {
    apartments
  }

  return (
    <ApartmentContext.Provider value={values}>
      {props.children}
    </ApartmentContext.Provider>
  );
}


