import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import star_icon from "../assets/icons/Star_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/Product.css";
import "../styles/reset.css";

const ProductPage4 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [isReviewButtonDisabled, setIsReviewButtonDisabled] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    setIsReviewButtonDisabled(!token);
  }, []);

  const loginUser = async (loginData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData,
        {
          withCredentials: true, // 세션 쿠키를 보내기 위한 설정
        }
      );

      if (response.status === 200) {
        console.log("로그인 성공!");
        setIsLoggedIn(true); // 로그인 상태 갱신
        setIsReviewButtonDisabled(false);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [quantity, setQuantity] = useState(1);
  const originalPrice = 38000;
  const discountRate = 0.27;
  const discountedPrice = originalPrice - originalPrice * discountRate;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const { productUid } = useParams();

  const [reviewImage, setReviewImage] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerPage = 10;

  const [userUid, setUserUid] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setReviewImage(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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

  const handleStarClick = (index) => {
    setRating(index + 1); // 클릭한 별을 포함한 그 이전 별까지 활성화
  };

  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsReviewPopupOpen(true);
  };

  const closeReviewPopup = () => {
    setIsReviewPopupOpen(false);
    setSelectedReview(null);
  };

  const fetchReviews = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/review/${productUid}`,
        {
          params: { page: page, size: reviewsPerPage },
        }
      );
      console.log(response.data);

      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  useEffect(() => {
    // currentPage가 변경될 때만 리뷰를 다시 가져옴
    fetchReviews(currentPage);
  }, [currentPage]); // currentPage가 변경될 때만 호출

  useEffect(() => {
    // totalPages가 변경될 때, currentPage가 totalPages를 초과하면
    if (currentPage > totalPages) {
      setCurrentPage(totalPages); // 마지막 페이지로 이동
    }
  }, [totalPages]);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSubmitReview = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 리디렉션
      return;
    }

    if (!reviewTitle || !reviewContent || rating === 0) {
      alert("제목, 내용, 별점을 모두 작성해 주세요.");
      return;
    }

    const reviewData = {
      title: reviewTitle,
      content: reviewContent,
      rating: rating,
      productDTO: { uid: productUid },
      image: reviewImage ? reviewImage : null,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/review/${productUid}`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setReviews((prevReviews) => [...prevReviews, response.data]);
      setIsPopupOpen(false);
      setReviewTitle("");
      setReviewContent("");
      setRating(0);
      setReviewImage(null);
    } catch (error) {
      console.error("Error:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  const handleEditReview = async () => {
    const updatedReviewData = {
      title: reviewTitle,
      content: reviewContent,
      rating: rating,
    };

    try {
      await axios.patch(
        `http://localhost:8080/review/${productUid}/${selectedReview.id}`,
        updatedReviewData
      );
      setReviews(
        reviews.map((review) =>
          review.id === selectedReview.id
            ? { ...review, ...updatedReviewData }
            : review
        )
      );
      setIsReviewPopupOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  const handleDeleteReview = async (reviewUid) => {
    try {
      await axios.delete(
        `http://localhost:8080/review/${productUid}/${reviewUid}`
      );
      setReviews(reviews.filter((review) => review.Uid !== reviewUid));
    } catch (error) {
      console.error("Error:", error);
      alert("서버와 연결할 수 없습니다.");
    }
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

        <div id="product_header">
          <p onClick={() => navigate("/product/4")}>REVIEW</p>
          <p>/</p>
          <p onClick={() => navigate("/product/4/qna")}>Q&A</p>
        </div>

        <div id="review_container">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                className="review"
                key={review.uid}
                onClick={() => handleReviewClick(review)}
              >
                <div className="review_star">
                  {[...Array(review.rating)].map((_, i) => (
                    <img key={i} src={star_icon} alt="평점" />
                  ))}
                </div>
                <div className="review_title">{review.title}</div>
                <div className="review_information">
                  <p>{review.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p>리뷰가 없습니다.</p>
          )}

          <button onClick={togglePopup} disabled={isReviewButtonDisabled}>
            작성하기
          </button>
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

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="content_flex">
              <p>제목</p>
              <input
                type="text"
                placeholder="제목"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              ></input>
            </div>

            <div className="content_flex">
              <p>별점</p>
              <div>
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={star_icon}
                    alt="별점"
                    onClick={() => handleStarClick(index)}
                    style={{
                      cursor: "pointer",
                      opacity: index < rating ? 1 : 0.5, // 클릭된 별은 진하게, 나머지는 흐리게
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="content_flex">
              <p>내용</p>
              <textarea
                placeholder="내용"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              ></textarea>
            </div>

            <div className="content_flex">
              <p>이미지 첨부</p>
              <input type="file" onChange={handleImageChange}></input>
            </div>

            <div className="popup_buttons">
              <button onClick={togglePopup}>취소</button>
              <input
                type="submit"
                value={"등록"}
                onClick={handleSubmitReview}
              ></input>
            </div>
          </div>
        </div>
      )}

      {isReviewPopupOpen && selectedReview && (
        <div className="popup">
          <div className="review_popup-content">
            <div className="review_image"></div>
            <div className="review_text">
              <p className="review_title">{selectedReview.title}</p>
              <div className="review_star">
                {[...Array(selectedReview.rating)].map((_, i) => (
                  <img key={i} src={star_icon} alt="별점" />
                ))}
                <p className="review_writer">{selectedReview.writer}</p>
                <p className="review_date">{selectedReview.date}</p>
              </div>
              <p className="review_content">{selectedReview.content}</p>
            </div>
            <button onClick={closeReviewPopup} className="close_button">
              닫기
            </button>
          </div>
        </div>
      )}

      <footer>
        <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default ProductPage4;
