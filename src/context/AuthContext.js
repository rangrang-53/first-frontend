import React, { createContext, useContext, useState } from "react";

// Context 생성
const AuthContext = createContext();

// Custom hook으로 로그인 상태를 사용할 수 있게끔 함
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인 함수
  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // token이 있으면 로그인 상태로 설정
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, checkLoginStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
