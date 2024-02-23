import React, { useRef } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const ForgotPasswordPage = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const forgotPasswordHandler = async () => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailRef.current.value,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      navigate("/");
      console.log(data);
    }
  };

  return (
    <motion.div
      className="flex flex-col w-96 h-[40vh] mx-auto my-60 shadow-2xl rounded-lg"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      <input
        className="border-2 p-1 mt-20 mx-10"
        type="text"
        id="email"
        placeholder="email"
        ref={emailRef}
      />
      <button
        onClick={forgotPasswordHandler}
        className="p-2 mx-36 mt-12 bg-violet-900 text-white"
      >
        Submit
      </button>
    </motion.div>
  );
};

export default ForgotPasswordPage;
