import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
