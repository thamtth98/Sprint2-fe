import React, { createContext, useContext, useState } from 'react';

const UserInfoContext = createContext();

export const useUserInfo = () => useContext(UserInfoContext);

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    fullName: "",
    avatar: "",
    phoneNumber: "",
    address: "",
    appRole: {
      roleName: ""
    }
  });

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
