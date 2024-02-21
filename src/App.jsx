import { Navigate, Route, Routes, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const islogged = localStorage.getItem("token");
  return (
    <>
      <Routes>
        <Route path="/" element=<LoginPage /> />
        <Route
          path="/home"
          element={!islogged ? <Navigate to={"/"} /> : <HomePage />}
        />
      </Routes>
    </>
  );
}

export default App;
