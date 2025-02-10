import { Route, Routes } from "react-router-dom";
import BrandPage from "./pages/BrandPage.js";
import CartPage from "./pages/CartPage.js";
import EventPage from "./pages/EventPage.js";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import OrderPage from "./pages/OrderPage.js";
import ProductPage4 from "./pages/ProductPage4.js";
import ProductPage4QnA from "./pages/ProductPage4QnA.js";
import SignupPage from "./pages/SignupPage.js";
import "./styles/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/event" element={<EventPage />}></Route>
      <Route path="/order" element={<OrderPage />}></Route>
      <Route path="/brand" element={<BrandPage />}></Route>
      <Route path="/product/:productUid" element={<ProductPage4 />}></Route>
      <Route path="/product/4/qna" element={<ProductPage4QnA />}></Route>
    </Routes>
  );
}

export default App;
