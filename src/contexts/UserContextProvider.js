import { createContext, useState, useEffect } from "react";

export const UserContext=createContext()

export default function UserContextProvider(props) {
  
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState()
  
    const fetchUsers = async () => {
      let res = await fetch("/rest/users");
      res = await res.json();
      setUsers(res);
    };

    useEffect(() => {
      
      fetchUsers();
      
    }, []);



  const addUser = async (user) => {
    let res = await fetch("/api/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    res = await res.json();
    user.id = res.id;

    console.log('The user object is being saved', res);
    setUsers([...users, user]);
      
  }
 
  const values = {
    users,
    addUser,
    setNewUser
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
  
}