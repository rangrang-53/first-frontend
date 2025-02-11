import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/ProductQnA.css";
import "../styles/reset.css";

const ProductPage4QnA = () => {
  const [passwordInputs, setPasswordInputs] = useState({});
  const [expandedQna, setExpandedQna] = useState(null);
  const [unlockedQnas, setUnlockedQnas] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [isQnaButtonDisabled, setIsQnaButtonDisabled] = useState(true);
  const [passwordPopupOpen, setPasswordPopupOpen] = useState(false);
  const [selectedQnaForPassword, setSelectedQnaForPassword] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    setIsQnaButtonDisabled(!token);
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
        setIsQnaButtonDisabled(false);
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

  const [isQnaPopupOpen, setIsQnaPopupOpen] = useState(false);
  const [selectedQna, setSelectedQna] = useState(null);

  const handleQnaClick = (qna) => {
    console.log("Q&A 클릭됨:", qna.uid); // ✅ 클릭 이벤트 확인
    setExpandedQna((prev) => {
      console.log(
        "이전 상태:",
        prev,
        "새 상태:",
        prev === qna.uid ? null : qna.uid
      );
      return prev === qna.uid ? null : qna.uid;
    });
  };

  const handlePasswordChange = (uid, value) => {
    setPasswordInputs((prev) => ({ ...prev, [uid]: value }));
  };

  const verifyPassword = async (qna) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/qna/${qna.uid}/verify`,
        { password: passwordInputs[qna.uid] || "" },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setQnas((prevQnas) =>
          prevQnas.map((item) =>
            item.uid === qna.uid ? { ...response.data, isUnlocked: true } : item
          )
        );
        setExpandedQna(qna.uid); // 비밀번호 입력 성공 시 해당 Q&A 확장
      }
    } catch (error) {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const closeQnaPopup = () => {
    setIsQnaPopupOpen(false);
    setSelectedQna(null);
  };

  const maskId = (id) => {
    if (!id || id.length < 4) return "****";
    return id.substring(0, 4) + "*".repeat(id.length - 4);
  };

  const [qnaTitle, setQnaTitle] = useState("");
  const [qnaContent, setQnaContent] = useState("");
  const { productUid } = useParams();

  const [qnaCategory, setQnaCategory] = useState("");
  const [qnaPassword, setQnaPassword] = useState("");

  const [qnas, setQnas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const qnasPerPage = 10;

  const [userUid, setUserUid] = useState(null);

  const fetchQnas = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/qna/${productUid}`,
        {
          params: { page: page, size: qnasPerPage },
        }
      );

      const updatedQnas = response.data.qnas.map((qna) => ({
        ...qna,
        isUnlocked: false, // 새로고침할 때 다시 비밀번호가 필요한 상태로 초기화
      }));

      setQnas(response.data.qnas);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  useEffect(() => {
    fetchQnas(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // totalPages가 변경될 때, currentPage가 totalPages를 초과하면
    if (currentPage > totalPages) {
      setCurrentPage(totalPages); // 마지막 페이지로 이동
    }
  }, [totalPages]);

  useEffect(() => {
    console.log("expandedQna 상태 변경:", expandedQna); // ✅ 상태 변경 확인
  }, [expandedQna]);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSubmitQna = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 리디렉션
      return;
    }

    if (!qnaTitle || !qnaContent || qnaCategory === null) {
      alert("제목, 내용, 카테고리를 모두 작성해 주세요.");
      return;
    }

    const qnaData = {
      title: qnaTitle || "", // null이면 ""로 대체
      content: qnaContent || "",
      category: ["product", "delivery", "etc"].includes(qnaCategory)
        ? qnaCategory
        : "etc",
      productDTO: { uid: productUid },
      password: qnaPassword ? qnaPassword : null,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/qna/${productUid}`,
        qnaData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("서버응답: ", response.data);

      await fetchQnas(currentPage);

      setIsPopupOpen(false);
      setQnaTitle("");
      setQnaContent("");
      setQnaCategory(null);
      setQnaPassword(null);
    } catch (error) {
      console.error("Error:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  const handleEditQna = async () => {
    const updatedQnaData = {
      title: qnaTitle,
      content: qnaContent,
      password: qnaPassword,
    };
  };

  const categoryMap = {
    product: "[상품문의]",
    delivery: "[배송문의]",
    etc: "[기타문의]",
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
          {qnas.length > 0 ? (
            qnas.map((qna) => (
              <div
                key={qna.uid}
                className={`qna_item ${
                  expandedQna === qna.uid ? "expanded" : ""
                }`}
              >
                <div className="qna_header" onClick={() => handleQnaClick(qna)}>
                  <p>{categoryMap[qna.category] || "[기타문의]"}</p>
                  <div className="qna_title">{qna.title}</div>
                  <div className="qna_info">
                    <p>{qna.writeDate.split("T")[0].replaceAll("-", ".")}</p>
                    <p>{maskId(qna.userDTO?.id)}</p>
                  </div>
                </div>

                {expandedQna === qna.uid && (
                  <div className="qna_content">
                    {qna.title === "🔒 비공개 질문입니다." &&
                    !qna.isUnlocked ? (
                      // 🔥 여기서 비밀번호 입력창이 Q&A 내부에서만 보이도록 변경!
                      <div className="password_input">
                        <input
                          type="password"
                          placeholder="비밀번호 입력"
                          value={passwordInputs[qna.uid] || ""}
                          onChange={(e) =>
                            handlePasswordChange(qna.uid, e.target.value)
                          }
                        />
                        <button onClick={() => verifyPassword(qna)}>
                          확인
                        </button>
                      </div>
                    ) : (
                      <p>{qna.content}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Q&A가 없습니다.</p>
          )}

          <button onClick={togglePopup} disabled={isQnaButtonDisabled}>
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
                value={qnaTitle ?? ""}
                onChange={(e) => setQnaTitle(e.target.value)}
              ></input>
            </div>

            <div className="content_flex">
              <p>카테고리</p>
              <select
                name="category"
                onChange={(e) => setQnaCategory(e.target.value)}
              >
                <option value="">카테고리</option>
                <option value="product">상품문의</option>
                <option value="delivery">배송문의</option>
                <option value="etc">기타문의</option>
              </select>
              <p>비밀번호</p>
              <input
                type="password"
                value={qnaPassword}
                onChange={(e) => setQnaPassword(e.target.value)}
              ></input>
            </div>

            <div className="content_flex">
              <p>내용</p>
              <textarea
                placeholder="내용"
                value={qnaContent ?? ""}
                onChange={(e) => setQnaContent(e.target.value)}
              ></textarea>
            </div>

            <div className="popup_buttons">
              <button onClick={togglePopup}>취소</button>
              <input
                type="submit"
                value={"등록"}
                onClick={handleSubmitQna}
              ></input>
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
