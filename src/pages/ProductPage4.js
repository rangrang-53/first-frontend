import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import star_icon from "../assets/icons/Star_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/Product.css";
import "../styles/reset.css";

const ProductPage4 = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [quantity, setQuantity] = useState(1);
  const originalPrice = 38000;
  const discountRate = 0.27;
  const discountedPrice = originalPrice - originalPrice * discountRate;

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

        <div id="product_header">
          <p>REVIEW</p>
          <p>/</p>
          <p>Q&A</p>
        </div>

        <div id="review_container">
          <div className="review">
            <div className="review_star">
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
            </div>
            <div className="review_title">너무 따뜻해요</div>
            <div className="review_information">
              <p>{formattedDate}</p>
              <div className="review_image"></div>
            </div>
          </div>

          <div className="review">
            <div className="review_star">
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
            </div>
            <div className="review_title">너무 따뜻해요</div>
            <div className="review_information">
              <p>{formattedDate}</p>
              <div className="review_image"></div>
            </div>
          </div>

          <div className="review">
            <div className="review_star">
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
            </div>
            <div className="review_title">너무 따뜻해요</div>
            <div className="review_information">
              <p>{formattedDate}</p>
              <div className="review_image"></div>
            </div>
          </div>

          <div className="review">
            <div className="review_star">
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
            </div>
            <div className="review_title">너무 따뜻해요</div>
            <div className="review_information">
              <p>{formattedDate}</p>
              <div className="review_image"></div>
            </div>
          </div>

          <div className="review">
            <div className="review_star">
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
              <img src={star_icon} alt="평점" />
            </div>
            <div className="review_title">너무 따뜻해요</div>
            <div className="review_information">
              <p>{formattedDate}</p>
              <div className="review_image"></div>
            </div>
          </div>

          <button>작성하기</button>
        </div>
      </main>

      <footer>
        <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default ProductPage4;
