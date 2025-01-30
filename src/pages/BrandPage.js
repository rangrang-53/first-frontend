import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/Brand.css";
import "../styles/reset.css";

const BrandPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
      </header>

      <main>
        <nav>
          <ul id="menu">
            <li id="woman">여성</li>
            <li></li>
            <li>남성</li>
            <li></li>
            <li>키즈</li>
            <li></li>
            <li>반려동물</li>
            <li></li>
            <li onClick={() => navigate("/event")}>EVENT</li>
          </ul>

          <ul id="icon">
            <li onClick={() => navigate("/login")}>
              <img src={login_icon} alt="로그인"></img>
            </li>
            <li onClick={() => navigate("/cart")}>
              <img src={cart_icon} alt="장바구니"></img>
            </li>
            <li></li>
          </ul>
        </nav>

        <div id ="bp_header">
            <div id= "bp_header_text">
                <p>론론</p>
                <p>(RONRON)</p>
                <p>고양이가 행복감을 느낄 때 내는 '갸르릉'거리는 소리를 표현한 프랑스어입니다.
                론론(RONRON)은 특별한 삶보다는 입가에 스며드는 웃음 짓는 일상을 사랑합니다.</p>
            </div>
        </div>
      </main>

      <footer>
        <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default BrandPage;
