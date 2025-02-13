import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import { useAuth } from "../context/AuthContext.js";
import "../styles/Order.css";
import "../styles/reset.css";

const OrderPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      const response = await axios.get("http://localhost:8080/check-login", {
        withCredentials: true,
      });

      setIsLoggedIn(response.data.isAuthenticated); // 서버 응답 구조에 맞게 수정 필요
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
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
            <li onClick={() => navigate("/event")}>EVENT</li>
          </ul>

          <ul id="icon">
            <li onClick={() => navigate("/login")}>
              <img src={login_icon} alt="로그인"></img>
            </li>
            <li onClick={() => navigate("/cart")}>
              <img src={cart_icon} alt="장바구니"></img>
            </li>
            <li>
              <button onClick={handleLoginLogout}>
                {isLoggedIn ? "LOGOUT" : "LOGIN"}
              </button>
            </li>
          </ul>
        </nav>

        <div id="orderPage_container">
          <p id="title">주문 / 결제</p>
          <p className="subheading">주문 상품</p>
          <ul id="cartHeader">
            <li>상품명</li>
            <li>수량</li>
            <li>가격</li>
          </ul>
          <ul className="product">
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
        <ul id="op_totalPrice">
          <li>총 주문금액: </li>
          <li>27,778원</li>
          <li>+</li>
          <li>2,500원</li>
          <li>=</li>
          <li>30,278원</li>
        </ul>

        <div id="orderPage_container2">
          <div className="orderPage_container2_box">
            <p className="title">배송 정보</p>
            <div className="box">
              <p>홍길동</p>
              <p>010-1234-5678</p>
              <p>서울시 강동구 천호동 12-123</p>
            </div>
          </div>

          <div className="orderPage_container2_box">
            <p className="title">결제 정보</p>
            <div className="box">
              <div className="inputs">
                <input type="radio" id="cardPayment" name="payment"></input>
                <label for="cardPayment">카드 결제</label>
              </div>
              <div className="inputs">
                <input type="radio" id="easyPayment" name="payment"></input>
                <label for="easyPayment">간편 결제</label>
              </div>
              <div className="inputs">
                <input type="radio" id="bankPayment" name="payment"></input>
                <label for="bankPayment">무통장 입금</label>
              </div>
            </div>
          </div>
        </div>

        <div id="agree_container">
          <p className="title">개인정보 제공 동의</p>
          <div id="agree1">
            <input type="radio" id="personalInformation"></input>
            <label for="personalInformation">
              주문 내역을 확인했으며 결제에 동의합니다.
            </label>
            <span>자세히</span>
          </div>

          <div id="agree2">
            <input type="radio" id="lastAgree"></input>
            <label for="lastAgree">
              클로씨는 통신판매중개자로, 업체 배송 상품의 상품/상품정보/거래
              등에 대한 책임은 클로씨가 아닌 판매자에게 있습니다.
            </label>
          </div>
        </div>

        <div id="buttons">
          <button>취소하기</button>
          <input type="submit" value={"결제하기"}></input>
        </div>
      </main>
      <footer>
        <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
      </footer>
    </>
  );
};

export default OrderPage;
