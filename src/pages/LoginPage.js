import React from "react";
import { Router, Link } from "react-router-dom";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/Login.css";
import "../styles/reset.css";

const LoginPage = () => {
  return (
    <>
      <header>
        <Link to="/"><img src={logo} alt="로고"/>
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
            <li><Link to="/login">
            <img src={login_icon}></img></Link></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </main>
      <footer></footer>
    </>
  );
}

export default LoginPage;
