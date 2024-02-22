import React, { useContext, useRef, useState } from "react";
import Card from "./Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
const Form = () => {
  const { setToken, setIsLoggedIn } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [login, setLogIn] = useState(false);
  const [sending, setSending] = useState(false);
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const notify = (text) => toast(text);
  const [confirmPass, setConfirmPass] = useState(true);

  const loginHandler = () => {
    setLogIn(!login);
  };

  const validatePasswords = () => {
    if (!login) {
      const passwordValue = passwordRef.current.value;
      const confirmPasswordValue = confirmPasswordRef.current.value;

      if (passwordValue === confirmPasswordValue) {
        setConfirmPass(true);
      } else {
        setConfirmPass(false);
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    validatePasswords();

    setSending(true);

    if (login) {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
            import.meta.env.VITE_API_KEY
          }`,
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passwordRef.current.value,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.idToken);
          setToken(data.idToken);
          setIsLoggedIn(true);
          navigate("/home");
          setSending(false);
          notify("successfully signed in");
        } else {
          const data = await response.json();
          setSending(false);
          notify(data.error.message);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      if (confirmPass) {
        try {
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
              import.meta.env.VITE_API_KEY
            }`,
            {
              method: "POST",
              body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
                returnSecureToken: true,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            notify("Successfully signed up");
            const data = await response.json();
            setSending(false);
          } else {
            const data = await response.json();
            notify(data.error.message);
            setSending(false);
            throw new Error(data.error.message);
          }
        } catch (error) {
          setSending(false);
          console.log(error);
        }
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <Card>
        <form
          className="form-main flex flex-col relative justify-self-center items-center"
          onSubmit={submitHandler}
        >
          {login ? (
            <h2 className="text-2xl fixed mt-6">Log in</h2>
          ) : (
            <h2 className="text-2xl fixed mt-6">Sign Up</h2>
          )}
          <input
            type="text"
            id="email"
            placeholder="email"
            className="bg-zinc-300 mt-[100px] rounded-xl h-10 w-64 p-5"
            ref={emailRef}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="bg-zinc-300 mt-4 rounded-xl h-10 w-64 p-5"
            ref={passwordRef}
            onChange={validatePasswords}
            required
            minLength={6}
          />
          {!login && (
            <input
              type="password"
              id="confirmpassword"
              placeholder="Confirm Password"
              className="bg-zinc-300 mt-4 rounded-xl h-10 w-64 p-5"
              ref={confirmPasswordRef}
              onChange={validatePasswords}
              required
              minLength={6}
            />
          )}

          {!confirmPass && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}

          {sending ? (
            <span>loading...</span>
          ) : (
            <button className="dark:md:hover:bg-purple-950 bg-purple-600 mt-9 mb-4 rounded-2xl text-white p-4">
              {login ? "Log in" : "Sign up"}
            </button>
          )}
        </form>

        {!login && (
          <div className="relative mt-10 bg-green-200 border-black w-60 p-2 ms-[70px] rounded mb-7 text-green-700">
            already have an account?
            <> </>
            <button onClick={loginHandler} className="text-green-900">
              log in
            </button>
          </div>
        )}
        {login && (
          <div className="relative mt-10 bg-green-200 border-black w-60 p-2 ms-[70px] rounded mb-7 text-green-700">
            Create An Acoount?
            <> </>
            <button onClick={loginHandler} className="text-green-900">
              sign up
            </button>
          </div>
        )}
      </Card>
    </>
  );
};

export default Form;
