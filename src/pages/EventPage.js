import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import { useAuth } from "../context/AuthContext.js";
import "../styles/Event.css";
import "../styles/reset.css";

const EventPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
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
            <li>
              <button onClick={handleLoginLogout}>
                {isLoggedIn ? "로그아웃" : "로그인"}
              </button>
            </li>
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
            {totalPages > 0 && (
              <div className="pagination">
                <div
                  className="pageNumber"
                  onClick={() => {
                    if (currentPage > 1) handlePageClick(currentPage - 1);
                  }}
                  style={{
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  {"<"}
                </div>

                {[...Array(totalPages)].map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handlePageClick(index + 1)}
                    className={
                      currentPage === index + 1 ? "pageItem active" : "pageItem"
                    }
                  >
                    {index + 1}
                  </div>
                ))}

                <div
                  className="pageNumber"
                  onClick={() => {
                    if (currentPage < totalPages)
                      handlePageClick(currentPage + 1);
                  }}
                  style={{
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  {">"}
                </div>
              </div>
            )}
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
