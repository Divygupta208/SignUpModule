import React, { useContext } from "react";
import CompleteProfile from "../component/CompleteProfile";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const ProfilePage = () => {
  return <CompleteProfile />;
};

export default ProfilePage;
