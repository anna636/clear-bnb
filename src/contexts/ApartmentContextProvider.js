import { createContext, useState, useEffect } from "react";

export const ApartmentContext = createContext()

export default function ApartmentContextProvider(props) {

  const [apartments, setApartments] = useState([]);


  const fetchApartments = async () => {
    let res = await fetch("/rest/apartments");
    res = await res.json();
    setApartments(res);
  };

  const createApartment = async (apartment) => {
    let res = await fetch("/rest/apartments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(apartment),
    });
    console.log(res)
    res = await res.json();
  };

  useEffect(() => {

    fetchApartments();

  }, []);


  const values = {
    apartments,
    createApartment
  }


  return (
    <ApartmentContext.Provider value={values}>
      {props.children}
    </ApartmentContext.Provider>
  );
}


