import { Navigate, Route, Routes, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useContext, useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import { AuthContext } from "./store/AuthContext";
import UserProfile from "./pages/UserProfile";
import { AnimatePresence } from "framer-motion";
import ForgotPassword from "./pages/ForgotPassword";
import HomeRoot from "./pages/HomeRoot";
import ExpensesDaily from "./component/ExpensesDaily";
import UserProfilePage from "./component/UserProfilePage";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element=<LoginPage /> />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/forgotpassword"
          element=<AnimatePresence key={2} mode="sync">
            <ForgotPassword></ForgotPassword>
          </AnimatePresence>
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfilePage /> : <Navigate to={"/"} />}
        />
        <Route path="/user" element=<HomeRoot />>
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="expenses" element={<ExpensesDaily />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
