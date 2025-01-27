import { Route, Routes } from "react-router-dom";
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
    </Routes>
  );
}

export default App;
