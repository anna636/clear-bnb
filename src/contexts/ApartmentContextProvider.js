import { createContext, useState, useEffect } from "react";

export const ApartmentContext = createContext()

export default function ApartmentContextProvider(props) {

  const [apartments, setApartments] = useState([]);
  const [apartmentId, setApartmentId] = useState('');

  const fetchApartments = async () => {
    let res = await fetch("/rest/apartments");
    res = await res.json();
    setApartments(res);
  };

  function setCurrentApartmentId(id) {
    setApartmentId(id)
    
}


  const deleteApartment = async () => {
    let res = await fetch("/rest/apartments/" + apartmentId , {
      method: "DELETE",
    });
    res = await res.json();
    console.log(`apartment with id ${apartmentId} has been deleted`);
  };

  useEffect(() => {

    fetchApartments();

  }, []);


  const values = {
    apartments,
    setCurrentApartmentId,
    deleteApartment
  };


  return (
    <ApartmentContext.Provider value={values}>
      {props.children}
    </ApartmentContext.Provider>
  );
}


