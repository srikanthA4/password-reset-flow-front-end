import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Main from "./Wrapper/Main";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:userId/:randomStr"
            element={<ResetPassword />}
          />
        </Routes>
      </Main>
    </Router>
  );
}

export default App;
