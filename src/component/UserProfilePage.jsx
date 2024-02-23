import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Example from "./TiltCard";

const UserProfilePage = () => {
  const [name, setName] = useState();
  const [profile, setProfile] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
          import.meta.env.VITE_API_KEY
        }`,

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
