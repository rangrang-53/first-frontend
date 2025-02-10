import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/Login.css";
import "../styles/reset.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ id: "", password: "" });
  const [signupData, setSignupData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData,
        { withCredentials: true }
      );
      console.log("로그인 성공!", response);
      localStorage.setItem("authToken", "loggedIn");
      navigate("/"); // 로그인 후 메인 페이지로 이동
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
    }
  };

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!signupData.nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/signup",
        {
          id: signupData.id,
          password: signupData.password,
          nickname: signupData.nickname, // nickname이 제대로 포함되었는지 확인
          auth: "USER", // 기본 권한 부여
        },
        { withCredentials: true } // 쿠키 인증 정보 포함 (필요한 경우)
      );

      console.log("회원가입 성공!", response);
      alert("회원가입 성공!");
      navigate("/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패", error.response?.data || error.message);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <>
      <header>
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
      </header>

      <main>
        <nav>
          <ul id="menu">
            <li>여성</li>
            <li></li>
            <li>남성</li>
            <li></li>
            <li>키즈</li>
            <li></li>
            <li>반려동물</li>
            <li></li>
            <li>EVENT</li>
          </ul>

          <ul id="icon">
            <li>
              <Link to="/login">
                <img src={login_icon} alt="로그인"></img>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <img src={cart_icon} alt="장바구니"></img>
              </Link>
            </li>
            <li></li>
          </ul>
        </nav>
        <div id="loginPage_container">
          <div id="lp_login_container" onClick={() => navigate("/login")}>
            <p>LOGIN</p>
            <div className="box">
              <input
                type="text"
                name="id"
                placeholder="아이디"
                value={loginData.id}
                onChange={(e) => handleChange(e, "login")}
              ></input>
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={loginData.password}
                onChange={(e) => handleChange(e, "login")}
              ></input>
            </div>
            <div className="buttons">
              <button>취소</button>
              <button onClick={handleLogin}>확인</button>
            </div>
          </div>

          <div id="lp_signup_container" onClick={() => navigate("/signup")}>
            <p>SIGNUP</p>
            <div className="box">
              <input
                type="text"
                name="id"
                placeholder="아이디"
                value={signupData.id}
                onChange={(e) => handleChange(e, "signup")}
              ></input>
              <input
                type="password"
                name="id"
                placeholder="비밀번호"
                value={signupData.password}
                onChange={(e) => handleChange(e, "signup")}
              ></input>
              <input
                type="password"
                name="password"
                placeholder="비밀번호 확인"
                value={signupData.confirmPassword}
                onChange={(e) => handleChange(e, "signup")}
              ></input>
              <input
                type="text"
                name="nickname"
                placeholder="닉네임"
                value={signupData.nickname}
                onChange={(e) => handleChange(e, "signup")}
              ></input>
            </div>
            <div className="buttons">
              <button>취소</button>
              <button onClick={() => setLoginData({ id: "", password: "" })}>
                확인
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
      </footer>
    </>
  );
};

export default LoginPage;
