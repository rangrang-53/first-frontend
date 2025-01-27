import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage.js";
import EventPage from "./pages/EventPage.js";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
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
    </Routes>
  );
}

export default App;
