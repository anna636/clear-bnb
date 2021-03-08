import { createContext, useState, useEffect } from "react";

export const ApartmentContextProvider=createContext()

export default function ApartmentContextProvider(props) {

  const [apartments, setApartments] = useState([]);

   const fetchApartments = async () => {
     let res = await fetch("/rest/apartments");
     res = await res.json();
     setRecipes(res);
   };



  return (
    <div>
      
    </div>
  )
}


