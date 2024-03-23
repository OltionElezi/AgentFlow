import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [typeofUser, setTypeofUser] = useState("");

  const updateUserType = (type) => {
    setTypeofUser(type);
  };

  return (
    <UserType.Provider
      value={{ userId, setUserId, typeofUser, updateUserType }}
    >
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext }; // Exporting named exports
