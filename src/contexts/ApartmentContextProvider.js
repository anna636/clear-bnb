import { createContext, useState, useEffect } from "react";

export const ApartmentContext = createContext()

export default function ApartmentContextProvider(props) {

  const [apartments, setApartments] = useState([]);
  const [apartment, setApartment] = useState({});

  const fetchApartments = async () => {
    let res = await fetch("/rest/apartments");
    res = await res.json();
    setApartments(res);
  };

  useEffect(() => {

    fetchApartments();

  }, []);

  const fetchApartment = async (apartmentId) => {
    let res = await fetch("/rest/apartments/" + apartmentId);
    res = await res.json();
    setApartment(res);
  };

  const getApartmentById = async (apartmentId) => {
    await fetchApartment(apartmentId)
   }



  const values = {
    apartments,
    getApartmentById,
    apartment
  }


  return (
    <ApartmentContext.Provider value={values}>
      {props.children}
    </ApartmentContext.Provider>
  );
}


