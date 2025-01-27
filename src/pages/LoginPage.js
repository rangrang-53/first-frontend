import React from "react";
import { Link, useNavigate } from "react-router-dom";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/Login.css";
import "../styles/reset.css";

const LoginPage = () => {
  const navigate = useNavigate();
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
                <img src={login_icon}></img>
              </Link>
            </li>
            <li></li>
            <li></li>
          </ul>
        </nav>
        <div id="loginPage_container">
          <div id="lp_login_container" onClick={() => navigate("/login")}>
            <p>LOGIN</p>
            <div className="box">
              <input type="text" placeholder="아이디"></input>
              <input type="text" placeholder="비밀번호"></input>
            </div>
            <div className="buttons">
              <button>취소</button>
              <input type="submit" value={"확인"}></input>
            </div>
          </div>

          <div id="lp_signup_container" onClick={() => navigate("/signup")}>
            <p>SIGNUP</p>
            <div className="box">
              <input type="text" placeholder="아이디"></input>
              <input type="text" placeholder="비밀번호"></input>
              <input type="text" placeholder="비밀번호 확인"></input>
              <input type="text" placeholder="닉네임"></input>
            </div>
            <div className="buttons">
              <button>취소</button>
              <input type="submit" value={"확인"}></input>
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
