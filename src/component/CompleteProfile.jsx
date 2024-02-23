import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, stagger } from "framer-motion";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Card from "./Card";
import { AuthContext } from "../store/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { FcApproval } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [name, setName] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const imageUrlRef = useRef();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const { token, isLoggedIn } = useContext(AuthContext);
  const notify = (text) => toast(text);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
          import.meta.env.VITE_API_KEY
        }`,

        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),

          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setName(data.users[0].displayName);
        setProfile(data.users[0].photoUrl);
      }
    };
    fetchUserData();
  }, [token]);
  // function handleChange(e) {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       imageUrlRef.current.value = e.target.result;
  //     };
  //     console.log(imageUrlRef.current.value);
  //     reader.readAsDataURL(file);
  //   }
  // }

  const onUpdateHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: nameRef.current.value,
          photoUrl: imageUrlRef.current.value,
          returnSecureToken: true,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      notify(data.error.message);
    }
  };

  const verifyEmailHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setVerified(true);
        notify("Email Verified");
      } else {
        const data = await response.json();
        setLoading(false);
        notify(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userProfileHandler = () => {
    navigate(`/profile/${token}`);
  };

  return (
    <>
      <ToastContainer />
      <div className="border-2 h-20  absolute inset-0 left-0 flex align-middle justify-between ">
        <div className="mt-5 ml-5">Winners Never Quit !!</div>
        <div className="mr-10 mb-5 flex align-middle mt-5 gap-4 bg-slate-200 rounded-xl p-1">
          <div>
            your profile is <strong>64%</strong> complete{" "}
          </div>

          <motion.button
            whileHover={{
              scale: 1.1,
              transition: {
                type: "spring",
                bounce: 0.3,
                damping: 5,
              },
            }}
            onClick={userProfileHandler}
            className="bg-violet-700 text-white h-auto rounded-xl p-1"
          >
            Complete
          </motion.button>

          <motion.div
            className="mt-1 text-2xl"
            whileHover={{ scale: 1.2 }}
            animate={{
              translateX: [-10, -5, 0, 5, 10],
              transition: {
                ease: "linear",
                repeat: Infinity,
                duration: 0.7,
              },
              opacity: 0,
            }}
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </motion.div>
        </div>
      </div>
      <div className="relative  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-[30vh] h-auto w-[60vw] ml-[20vw] p-4 rounded-xl">
        <div className="flex justify-between p-3">
          <strong className="text-xl">Contact Details</strong>
          <button className="text-red-400 border-2 border-red-500 p-2 rounded-xl  hover:">
            cancle
          </button>
        </div>
        {profile && (
          <img className="w-32 ml-[25vw] rounded-2xl" src={profile} />
        )}
        <form onSubmit={onUpdateHandler}>
          <div className="flex flex-wrap gap-10 ml-[14rem] mt-[5rem]">
            <input
              className="border-slate-800 rounded-lg p-1 border-[1px]"
              type="text"
              placeholder="Full Name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border-slate-800 border-[1px] p-1 rounded-lg"
              type="text"
              placeholder="Profile Photo URL"
              ref={imageUrlRef}
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            />
            {/* <input type="file" accept="image/*" onChange={handleChange} /> */}
          </div>

          <div className="flex justify-between">
            <motion.button
              whileTap={{
                scale: 1.2,
                transition: {
                  type: "spring",
                  bounce: 0.5,
                },
              }}
              className=" rounded-lg p-1 bg-orange-950 text-white w-[10rem] mt-10 border-2"
            >
              Update
            </motion.button>
            <motion.button
              whileTap={{
                scale: 1.2,
                transition: {
                  type: "spring",
                  bounce: 0.5,
                },
              }}
              onClick={verifyEmailHandler}
              type="button"
              className=" rounded-lg p-1 bg-orange-950 text-white w-[10rem] mt-10 border-2"
            >
              {loading ? (
                <div>
                  <motion.span
                    animate={{
                      translateX: [1, 10, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 0.7,
                      },
                      opacity: 0,
                    }}
                  >
                    ...
                  </motion.span>
                </div>
              ) : (
                "Verify Email"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompleteProfile;
