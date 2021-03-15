import { createContext, useState, useEffect } from "react";

export const UserContext=createContext()

export default function UserContextProvider(props) {
  
  const [users, setUsers] = useState([])
  
    const fetchUsers = async () => {
      let res = await fetch("/rest/users");
      res = await res.json();
      setUsers(res);
    };

    useEffect(() => {
      // mounted
      fetchUsers();
    }, []);



  const addUser = async (user) => {
    let res = await fetch("/rest/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    res = await res.json();
    user.id = res.id;

    console.log('The user object is being saved', res);

    // append a new recipe to the reactive recipes list.
    // and to trigger reactivity we have to replace
    // the recipe object with a new object (in this case, a copy of the array)
    setUsers([...users, user]);
      
  }



      
  const values = {
    users,
    addUser,
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
  
}