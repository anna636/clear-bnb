import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {

  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);


  const fetchUsers = async () => {
    let res = await fetch("/rest/users");
    res = await res.json();
    setUsers(res);

  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const registerUser = async (user) => {
    let res = await fetch("/api/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    res = await res.json();
  };

  const login = async (user) => {
    let res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    res = await res.json();
    if (res.success) {
      setCurrentUser({ ...res.user })
    } else {
      return;
    }
  };

  const whoAmI = async () => {
    let res = await fetch("/api/whoami");
    res = await res.json();
    if (!res.error) {
      setCurrentUser({ ...res });
    } else { setCurrentUser(null); }
  };

  const getCurrentUser = () => {
    return currentUser
  }

  const getBeautifulUsername = () => {
    let length = getCurrentUser().fullName.length;
    return getCurrentUser().fullName.substring(0, 1).toUpperCase() + getCurrentUser().fullName.substring(1, length).toLowerCase();
  }

  const logout = async () => {
    let res = await fetch("/api/logout", {
      method: "DELETE",
    });
    res = await res.json();
    setCurrentUser(null)
  };

  useEffect(() => {
    whoAmI();
  }, []);

  const values = {
    registerUser,
    login,
    logout,
    getCurrentUser,
    getBeautifulUsername,
    currentUser,
    users
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
}
