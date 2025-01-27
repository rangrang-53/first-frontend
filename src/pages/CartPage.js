import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/Cart.css";
import "../styles/reset.css";

const CartPage = () => {
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

        <div id="cartPage_container">
          <p>CART</p>
          <ul id="cartHeader">
            <input type="checkbox"></input>
            <li>상품명</li>
            <li>수량</li>
            <li>가격</li>
          </ul>
          <ul className="product">
            <input type="checkbox"></input>
            <li>
              <div id="image"></div>
            </li>
            <li id="name">
              <p>엥브록스</p>
              <p>cotton candy muffler_lemon</p>
            </li>
            <li>1</li>
            <li>27,778원</li>
          </ul>
        </div>
        <ul id="totalPrice">
          <li>27,778원</li>
          <li>+</li>
          <li>2,500원</li>
          <li>=</li>
          <li>30,278원</li>
        </ul>

        <div id="buttons">
          <button>삭제하기</button>
          <input type="submit" value={"결제하기"}></input>
        </div>
      </main>
      <footer>
        <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
      </footer>
    </>
  );
};

export default CartPage;
