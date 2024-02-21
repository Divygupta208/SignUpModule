import React, { useRef, useState } from "react";
import Card from "./Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Form = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [sending, setSending] = useState(false);
  const confirmPasswordRef = useRef();
  const notify = (text) => toast(text);

  const [confirmPass, setConfirmPass] = useState(true);

  const validatePasswords = () => {
    const passwordValue = passwordRef.current.value;
    const confirmPasswordValue = confirmPasswordRef.current.value;

    if (passwordValue === confirmPasswordValue) {
      setConfirmPass(true);
    } else {
      setConfirmPass(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    validatePasswords();
    setSending(true);
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
  };
  return (
    <>
      <ToastContainer />
      <Card>
        <form
          className="form-main flex flex-col relative justify-self-center items-center"
          onSubmit={submitHandler}
        >
          <h2 className="text-2xl fixed mt-6">Sign Up</h2>
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
          {!confirmPass && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}

          {sending ? (
            <span>loading...</span>
          ) : (
            <button className="dark:md:hover:bg-purple-950 bg-purple-600 mt-9 rounded-2xl text-white p-4">
              Sign Up
            </button>
          )}
        </form>

        <div className="relative mt-10 bg-green-200 border-black w-60 p-2 ms-[70px] rounded mb-7 text-green-700">
          already have an account?
          <> </>
          <button className="text-green-900">log in</button>
        </div>
      </Card>
    </>
  );
};

export default Form;