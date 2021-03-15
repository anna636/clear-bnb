import { createContext, useState, useEffect } from 'react';

export const HousingContext = createContext();

export default function HousingContextProvider(props) {
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
  };

  return (
    <div>
      <HousingContext.Provider value={values}>
        {props.children}  
      </HousingContext.Provider>  
    </div>
  )
}
