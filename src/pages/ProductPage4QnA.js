import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import lock_icon from "../assets/icons/Lock_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/ProductQnA.css";
import "../styles/reset.css";

const ProductPage4QnA = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [quantity, setQuantity] = useState(1);
  const originalPrice = 38000;
  const discountRate = 0.27;
  const discountedPrice = originalPrice - originalPrice * discountRate;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1); // 수량 증가
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // 수량 감소 (최소 1)
    }
  };

  const calculateTotalPrice = () => {
    const totalPrice = discountedPrice * quantity;
    const shippingFee = totalPrice >= 50000 ? 0 : 2500; // 50000원 이상이면 배송비 무료
    return totalPrice + shippingFee;
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // 팝업 상태 토글
  };

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

        <div id="product_container">
          <div id="product_image"></div>
          <div id="product_description">
            <p>앵브록스</p>
            <p>cotton candy muffler_Lemon</p>
            <div className="line"></div>
            <del>{originalPrice.toLocaleString()}원</del>
            <div className="product_price">
              <span>{(discountRate * 100).toFixed(0)}%</span>
              <span>{discountedPrice.toLocaleString()}원</span>
              <span>배송비 : 2,500원 (5만원 이상 구매 시 무료배송)</span>
            </div>
            <select
              name="color"
              onChange={handleColorChange}
              value={selectedColor}
            >
              <option value="yellow">yellow</option>
            </select>
            <div className="last">
              <p>{selectedColor}</p>
              <div id="quantity">
                <span onClick={handleIncrease}>+</span>
                <span>{quantity}</span>
                <span onClick={handleDecrease}>-</span>
              </div>
              <p>{discountedPrice.toLocaleString()}원</p>
            </div>
          </div>
        </div>

        <div id="total_price">
          <span>총 결제 금액:</span>
          <span>{calculateTotalPrice().toLocaleString()}원</span>
        </div>

        <div id="buttons">
          <input type="submit" value={"장바구니 담기"}></input>
          <input type="submit" value={"바로 구매"}></input>
        </div>

        <div id="qna_header">
          <p onClick={() => navigate("/product/4")}>REVIEW</p>
          <p>/</p>
          <p onClick={() => navigate("/product/4/qna")}>Q&A</p>
        </div>

        <div id="qna_container">
          <div className="qna">
            <p className="qna_category">{"[상품문의]"}</p>

            <div className="qna_title">
              <img src={lock_icon} alt="자물쇠"></img>비밀글입니다.
            </div>
            <div className="qna_information">
              <p>{formattedDate}</p>
              <p className="writer_id">abc****</p>
            </div>
          </div>

          <div className="qna">
            <p className="qna_category">{"[상품문의]"}</p>

            <div className="qna_title">
              <img src={lock_icon} alt="자물쇠"></img>비밀글입니다.
            </div>
            <div className="qna_information">
              <p>{formattedDate}</p>
              <p className="writer_id">abc****</p>
            </div>
          </div>

          <div className="qna">
            <p className="qna_category">{"[상품문의]"}</p>

            <div className="qna_title">
              <img src={lock_icon} alt="자물쇠"></img>비밀글입니다.
            </div>
            <div className="qna_information">
              <p>{formattedDate}</p>
              <p className="writer_id">abc****</p>
            </div>
          </div>

          <div className="qna">
            <p className="qna_category">{"[상품문의]"}</p>

            <div className="qna_title">
              <img src={lock_icon} alt="자물쇠"></img>비밀글입니다.
            </div>
            <div className="qna_information">
              <p>{formattedDate}</p>
              <p className="writer_id">abc****</p>
            </div>
          </div>

          <div className="qna">
            <p className="qna_category">{"[상품문의]"}</p>

            <div className="qna_title">
              <img src={lock_icon} alt="자물쇠"></img>비밀글입니다.
            </div>
            <div className="qna_information">
              <p>{formattedDate}</p>
              <p className="writer_id">abc****</p>
            </div>
          </div>

          <button onClick={togglePopup}>작성하기</button>

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

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="content_flex">
              <p>제목</p>
              <input type="text" placeholder="제목"></input>
            </div>

            <div className="content_flex">
              <p>카테고리</p>
              <select name="category">
                <option value="qna_product">상품문의</option>
                <option value="qna_delivery">배송문의</option>
                <option value="qna_etc">기타문의</option>
              </select>
              <p>비밀번호</p>
              <input type="password"></input>
            </div>

            <div className="content_flex">
              <p>내용</p>
              <textarea placeholder="내용"></textarea>
            </div>

            <div className="content_flex">
              <p>이미지 첨부</p>
              <input type="file"></input>
            </div>

            <div className="popup_buttons">
              <button onClick={togglePopup}>취소</button>
              <input type="submit" value={"등록"}></input>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default ProductPage4QnA;
