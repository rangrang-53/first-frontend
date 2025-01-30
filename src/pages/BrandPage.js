import React from "react";
import {Link, useNavigate} from "react-router-dom";
import cart_icon from "../assets/icons/Bag_alt_light.png";
import login_icon from "../assets/icons/User_alt_light.png";
import logo from "../assets/images/change.png";
import "../styles/Brand.css";
import "../styles/reset.css";

const BrandPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <header>
                <Link to="/">
                    <img src={logo} alt="로고"/>
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

                <div id="bp_header">
                    <div id="bp_header_text">
                        <p>론론</p>
                        <p>(RONRON)</p>
                        <p>고양이가 행복감을 느낄 때 내는 '갸르릉'거리는 소리를 표현한 프랑스어입니다. 론론(RONRON)은 특별한 삶보다는 입가에 스며드는 웃음
                            짓는 일상을 사랑합니다.</p>
                    </div>
                </div>

                <ul className="title">
                    <li></li>
                    <li>NEW ARRIVAL</li>
                </ul>
                <div id="bp_container">
                    <div id="bp_box1">
                        <ul id="container">
                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">HEART ARGYLE HEAVY CROP KNIT NAVY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">132,800원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">
                                    FURRY PONY RAGLAN JACQUARD KNIT BLACK
                                </p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">88,000원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">
                                    R HAIRY KNIT BROWN
                                </p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">VOLUME SLEEVE RIBBON SWEATSHIRT GREY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">52,800원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">BACK HEART STITCH POCKET JOGGER PANTS CREAM YELLOW</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">STITCH CORDUROY TRACK PANTS IVORY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                <ul className="title">
                    <li></li>
                    <li>BEST ITEM</li>
                </ul>

                <div id="bp_container">
                    <div id="bp_box1">
                        <ul id="container">
                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">HEART ARGYLE HEAVY CROP KNIT NAVY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">132,800원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">
                                    FURRY PONY RAGLAN JACQUARD KNIT BLACK
                                </p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">88,000원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">
                                    R HAIRY KNIT BROWN
                                </p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">VOLUME SLEEVE RIBBON SWEATSHIRT GREY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">52,800원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">BACK HEART STITCH POCKET JOGGER PANTS CREAM YELLOW</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">STITCH CORDUROY TRACK PANTS IVORY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                <ul className="title">
                    <li></li>
                    <li>ALL ITEM</li>
                </ul>
                
                    <div id="bp_box2">
                        <ul className="container">
                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">HEART ARGYLE HEAVY CROP KNIT NAVY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">132,800원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">
                                    FURRY PONY RAGLAN JACQUARD KNIT BLACK
                                </p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">88,000원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">
                                    R HAIRY KNIT BROWN
                                </p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">VOLUME SLEEVE RIBBON SWEATSHIRT GREY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">52,800원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">BACK HEART STITCH POCKET JOGGER PANTS CREAM YELLOW</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">STITCH CORDUROY TRACK PANTS IVORY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>
                        </ul>

                        <ul className="container">
                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">HEART ARGYLE HEAVY CROP KNIT NAVY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">132,800원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">
                                    FURRY PONY RAGLAN JACQUARD KNIT BLACK
                                </p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">88,000원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">
                                    R HAIRY KNIT BROWN
                                </p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">VOLUME SLEEVE RIBBON SWEATSHIRT GREY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">52,800원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">BACK HEART STITCH POCKET JOGGER PANTS CREAM YELLOW</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>

                            <li className="item">
                                <div className="image"></div>
                                <p className="product_name">STITCH CORDUROY TRACK PANTS IVORY</p>
                                <ul className="price_container">
                                    <span className="discount">20%</span>
                                    <span className="price">79,200원</span>
                                </ul>
                            </li>
                        </ul>
                    </div>
                
            </main>

            <footer>
                <div id="text">Copyright ⓒ CLOTHESºC. All Rights Reserved.</div>
            </footer>
        </div>
    );
};

export default BrandPage;
