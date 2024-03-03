import { Navigate, Route, Routes, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import UserProfile from "./pages/UserProfile";
import { AnimatePresence } from "framer-motion";
import ForgotPassword from "./pages/ForgotPassword";
import HomeRoot from "./pages/HomeRoot";
import ExpensesDaily from "./component/ExpensesDaily";

import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const themeDark = useSelector((state) => state.theme.themeDark);

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
        <Route
          path="/user"
          element=<div className={`${themeDark ? "dark" : ""}`}>
            <HomeRoot />
          </div>
        >
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="expenses" element={<ExpensesDaily />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
