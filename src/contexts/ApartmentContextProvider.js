import { createContext, useState, useEffect } from "react";

export const ApartmentContext = createContext()

export default function ApartmentContextProvider(props) {

  const [apartments, setApartments] = useState([]);
  const [apartment, setApartment] = useState({});
  const [apartmentId, setApartmentId] = useState("");

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    let res = await fetch("/rest/apartments");
    res = await res.json();
    setApartments(res);
  };

  function setCurrentApartmentId(id) {
    setApartmentId(id);
  }

  const deleteApartment = async () => {
    let res = await fetch("/rest/apartments/" + apartmentId, {
      method: "DELETE",
    });
    res = await res.json();
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
    createApartment,
    getApartmentById,
    apartment,
    fetchApartments,
    setCurrentApartmentId,
    deleteApartment,
  };

  return (
    <ApartmentContext.Provider value={values}>
      {props.children}
    </ApartmentContext.Provider>
  );
}


