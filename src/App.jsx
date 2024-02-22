import { Navigate, Route, Routes, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useContext, useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import { AuthContext } from "./store/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to={"/home"} /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to={"/"} />}
        ></Route>

        <Route path="profile" element=<ProfilePage /> />
      </Routes>
    </>
  );
}

export default App;
