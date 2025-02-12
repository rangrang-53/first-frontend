import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import { useAuth } from "../context/AuthContext.js";
import "../styles/Home.css";
import "../styles/reset.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [weatherImage, setWeatherImage] = useState(
    "/assets/icons/Sun_light@3x.png"
  );
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    checkLoginStatus();
  }, [setIsLoggedIn]);

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

      setIsLoggedIn(response.status === 200);
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

      // 페이지를 새로고침하여 상태를 완전히 초기화
      window.location.href = "/";
    } else {
      navigate("/login");
    }
  };

  const [weather, setWeather] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
    setCurrentDate(formattedDate);
  }, []);

  const [weatherStatus, setWeatherStatus] =
    useState("기상 상태를 불러오는 중...");

  function getBaseTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // 정각 이전이면 한 시간 전 값 사용
    if (minutes < 40) {
      hours -= 1;
    }

    // 시각을 두 자리 문자열로 변환 (예: 9 → "09", 13 → "13")
    const baseTime = `${String(hours).padStart(2, "0")}30`;
    return baseTime;
  }

  const getWeather = useCallback(async (lat, lon) => {
    const { nx, ny } = latLonToGrid(lat, lon);
    const apiKey =
      "QL99OvgowvipV6jjgv1NoKwE8GMJnbROjRN0%2BxGQJz0497ViPFxnd04lXqgSskbJMcFoGhZGQeidvVCJYOY9Jg%3D%3D";
    const date = new Date();
    const baseDate = date.toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD 형식
    const baseTime = `${String(date.getHours()).padStart(2, "0")}00`; // HH00 형식

    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${apiKey}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.response && data.response.body && data.response.body.items) {
        const items = data.response.body.items.item;

        const tempData = items.find((i) => i.category === "T1H");
        const ptyData = items.find((i) => i.category === "PTY");

        if (tempData && tempData.obsrValue) {
          setWeather(tempData.obsrValue + "°C");
        } else {
          setWeather("온도 정보를 찾을 수 없습니다.");
        }

        if (ptyData && ptyData.obsrValue) {
          const { status, image } = getPrecipitationType(ptyData.obsrValue); // 상태와 이미지 정보 반환
          setWeatherStatus(status);
          setWeatherImage(image);
        } else {
          setWeatherStatus("강수 상태 정보를 찾을 수 없습니다.");
        }
      } else {
        console.error("응답 데이터에서 items를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("날씨 정보를 가져오는 중 오류 발생:", error);
      setWeather("날씨 정보를 불러올 수 없습니다.");
      setWeatherStatus("기상 상태를 불러올 수 없습니다.");
    }
  }, []);

  // 강수 형태를 해석하는 함수
  function getPrecipitationType(ptyCode) {
    switch (ptyCode) {
      case "0":
        return { status: "없음", image: "/assets/icons/Sun_light@3x.png" };
      case "1":
        return { status: "비", image: "/assets/icons/Rain_light@3x.png" };
      case "2":
        return { status: "비/눈", image: "/assets/icons/Rain_light@3x.png" };
      case "3":
        return { status: "눈", image: "/assets/icons/Winter_light@3x.png" };
      default:
        return "알 수 없는 강수 형태";
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          getWeather(lat, lon);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다.", error);
        }
      );
    }
  }, [getWeather]);

  function latLonToGrid(lat, lon) {
    const RE = 6371.00877;
    const GRID = 5.0;
    const SLAT1 = 30.0;
    const SLAT2 = 60.0;
    const OLON = 126.0;
    const OLAT = 38.0;
    const XO = 43;
    const YO = 136;

    const DEGRAD = Math.PI / 180.0;
    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    let sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);

    let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    let theta = lon * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;

    const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

    return { nx: x, ny: y };
  }

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
                {isLoggedIn ? "로그아웃" : "로그인"}
              </button>
            </li>
          </ul>
        </nav>

        <div id="vanner"></div>

        <ul className="title">
          <li></li>
          <li>오늘 뭐 입지?</li>
        </ul>
        <div id="box1_container">
          <div id="box1_component1">
            <ul id="container">
              <li className="item">
                <div className="image"></div>
                <p className="brand_name">와이 이</p>
                <p className="product_name">Sand Leather jacket -black</p>
                <ul className="price_container">
                  <span className="discount">26%</span>
                  <span className="price">232,773원</span>
                </ul>
              </li>

              <li className="item">
                <div className="image"></div>
                <p className="brand_name">시티브리즈</p>
                <p className="product_name">
                  메리노울 심볼 로고 풀오버 니트 - 5 COLOR
                </p>
                <ul className="price_container">
                  <span className="discount">33%</span>
                  <span className="price">87,075원</span>
                </ul>
              </li>

              <li className="item">
                <div className="image"></div>
                <p className="brand_name">유라고</p>
                <p className="product_name">
                  Jacquard hoodie cardigan - 2 COLOR
                </p>
                <ul className="price_container">
                  <span className="discount">24%</span>
                  <span className="price">87,975원</span>
                </ul>
              </li>

              <li className="item">
                <div
                  className="image"
                  onClick={() => navigate("/product/4")}
                ></div>
                <p
                  className="brand_name"
                  onClick={() => navigate("/product/4")}
                >
                  앵브록스
                </p>
                <p
                  className="product_name"
                  onClick={() => navigate("/product/4")}
                >
                  cotton candy muffler _Lemon
                </p>
                <ul className="price_container">
                  <span className="discount">27%</span>
                  <span className="price">27,740원</span>
                </ul>
              </li>
            </ul>
          </div>
          <div id="box1_component2">
            <p>현재 날씨</p>
            <p>TODAY : {currentDate}</p>
            <div id="weather_box">
              <img src={weatherImage} alt={weatherStatus} />
              <p>{weather ? weather : "날씨 정보를 불러오는 중..."}</p>
            </div>

            <p id="mm">
              강수량 :{" "}
              {weatherStatus ? weatherStatus : "기상 상태를 불러오는 중..."}
            </p>
            <div></div>
          </div>
        </div>

        <ul className="title">
          <li></li>
          <li>MD’s PICK</li>
        </ul>
        <div id="box2_container">
          <ul id="container">
            <li className="item">
              <div className="image"></div>
              <p className="brand_name">오끼뜨</p>
              <p className="product_name">
                도미토리 시즌 스트라이프 파자마 초코트리
              </p>
              <ul className="price_container">
                <span className="discount">10%</span>
                <span className="price">67,640원</span>
              </ul>
            </li>

            <li className="item">
              <div className="image"></div>
              <p className="brand_name">코코모코</p>
              <p className="product_name">스노우베어 윈터 니트_소라</p>
              <ul className="price_container">
                <span className="discount">24%</span>
                <span className="price">25,245원</span>
              </ul>
            </li>

            <li className="item">
              <div className="image"></div>
              <p className="brand_name">코드그라피</p>
              <p className="product_name">
                JRDS 유틸리티 덕다운 후드 숏패딩_3 COLOR
              </p>
              <ul className="price_container">
                <span className="discount">26%</span>
                <span className="price">147,160원</span>
              </ul>
            </li>

            <li className="item">
              <div className="image"></div>
              <p className="brand_name">STK</p>
              <p className="product_name">강아지 고양이 누빔조끼 블루 S</p>
              <ul className="price_container">
                <span className="discount">24%</span>
                <span className="price">11,300원</span>
              </ul>
            </li>

            <li className="item">
              <div className="image"></div>
              <p className="brand_name">비터셀즈</p>
              <p className="product_name">Crop Puffer Jacket _7 COLOR</p>
              <ul className="price_container">
                <span className="discount">40%</span>
                <span className="price">64,900원</span>
              </ul>
            </li>

            <li className="item">
              <div className="image"></div>
              <p className="brand_name">와이 이</p>
              <p className="product_name">warm Brush pants - l/Grey</p>
              <ul className="price_container">
                <span className="discount">29%</span>
                <span className="price">69,594원</span>
              </ul>
            </li>
          </ul>
        </div>

        <ul className="title">
          <li></li>
          <li>
            {currentDate
              ? currentDate.split("년 ")[1]?.split("월")[0]
              : "날짜 정보 없음"}
            월의 브랜드
          </li>
        </ul>
        <div id="this_brand">
          <div id="lookbook" onClick={() => navigate("/brand")}>
            <div id="brand_name">
              <p>론론</p>
              <p>RONRON. 2024 WINTER</p>
            </div>
          </div>
          <div id="product_container">
            <div className="product"></div>
            <div className="product"></div>
            <div className="product"></div>
            <div className="product"></div>
          </div>
        </div>
      </main>

      <footer>
        <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default HomePage;
