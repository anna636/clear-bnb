import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {

  const [users, setUsers] = useState([]);

  const registerUser = async (user) => {
    let res = await fetch("/api/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    res = await res.json();
    user.id = res.id;

    console.log("The user object is being saved", res);
    setUsers([...users, user]);
  };

  const login = async (user) => {
    let res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    res = await res.json();
  };

  const [user, setUser] = useState();

  const whoAmI = async () => {
    let res = await fetch("/api/whoami");
    res = await res.json();
    if (!res.error) {
      setUser(res);
    } else { return; }
  };


  const logout = async () => {
    let res = await fetch("/api/logout", {
      method: "DELETE",
    });
    res = await res.json();
  };

  useEffect(() => {
    whoAmI();
  }, []);


  const values = {
    registerUser,
    login,
    logout,
    user
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
}
