import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {

  const [currentUser, setCurrentUser] = useState(null);

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
    getCurrentUser
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
}
