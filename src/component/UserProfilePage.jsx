import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Example from "./TiltCard";

const UserProfilePage = () => {
  const [name, setName] = useState();
  const [profile, setProfile] = useState();
  const { id } = useParams();

  // const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=12345`,

        {
          method: "POST",
          body: JSON.stringify({
            idToken: id,
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
  }, []);

  return (
    <div>
      <Example username={name} userImg={profile} />;
    </div>
  );
  //
};

export default UserProfilePage;
