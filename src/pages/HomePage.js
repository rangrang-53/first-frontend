import React from "react";
import "../styles/Home.css";
import "../styles/reset.css";

function App() {
  return (
    <div>
      <header>
        <div></div>
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
            <li></li>
            <li></li>
            <li></li>
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
                <div className="image"></div>
                <p className="brand_name">앵브록스</p>
                <p className="product_name">cotton candy muffler _Lemon</p>
                <ul className="price_container">
                  <span className="discount">27%</span>
                  <span className="price">27,778원</span>
                </ul>
              </li>
            </ul>
          </div>
          <div id="box1_component2">
            <p>현재 날씨</p>
            <p>강동구 천호동</p>
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
          <li>1월의 브랜드</li>
        </ul>
        <div id="this_brand">
          <div id="lookbook">
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
}

export default App;
