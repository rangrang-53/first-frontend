import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/Event.css";
import "../styles/reset.css";

const EventPage = () => {
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
            <li id="eventPage" onClick={() => navigate("/event")}>
              EVENT
            </li>
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

        <div id="eventPage_container">
          <p>EVENT</p>
          <ul id="vanner_container">
            <li>
              <div className="image"></div>
              <div className="status">진행중</div>
              <div className="text">
                <p>윈터 세일</p>
                <p>25.02.01 - 25.02.28</p>
              </div>
            </li>
            <li>
              <div className="image"></div>
              <div className="status">종료</div>
              <div className="text">
                <p>설 맞이 이벤트</p>
                <p>24.10.01 - 24.10.08</p>
              </div>
            </li>
            <li>
              <div className="image"></div>
              <div className="status">종료</div>
              <div className="text">
                <p>가을 세일</p>
                <p>24.10.01 - 24.10.08</p>
              </div>
            </li>
            <li>
              <div className="image"></div>
              <div className="status">종료</div>
              <div className="text">
                <p>여름 세일</p>
                <p>24.07.01 - 24.07.08</p>
              </div>
            </li>
          </ul>

          <div id="page">
            <div className="pageNumber">{"<"}</div>
            <div className="pageNumber">1</div>
            <div className="pageNumber">2</div>
            <div className="pageNumber">3</div>
            <div className="pageNumber">4</div>
            <div className="pageNumber">5</div>
            <div className="pageNumber">6</div>
            <div className="pageNumber">7</div>
            <div className="pageNumber">8</div>
            <div className="pageNumber">9</div>
            <div className="pageNumber">10</div>
            <div className="pageNumber">{">"}</div>
          </div>
        </div>
      </main>
      <footer>
        <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
      </footer>
    </>
  );
};

export default EventPage;
