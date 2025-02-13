import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState(null); // 사용자 식별자 상태 추가

  // 로그인 상태 확인 함수
  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  };

  // 로그인 상태일 때 사용자 정보를 백엔드에서 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const response = await axios.get("http://localhost:8080/user-info", {
        withCredentials: true,
      });
      // 백엔드에서 반환하는 필드명에 따라 uid 또는 id 사용
      setUserUid(response.data.uid || response.data.id);
    } catch (error) {
      console.error("User info fetch error:", error);
    }
  };

  // 로그인 상태가 변경될 때마다 사용자 정보를 가져옴
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
    } else {
      setUserUid(null);
    }
  }, [isLoggedIn]);

  // 초기 로그인 상태 확인 (예: 앱 시작 시)
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        checkLoginStatus,
        userUid,
        fetchUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
