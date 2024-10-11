import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { jwtDecode } from "jwt-decode";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

type JwtPayload = {
  id: string;
};

const Root = () => {
  const navigate = useNavigate();
  const { getUser } = useContext(UserContext);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    checkIfUserIsLoggedIn();

    if (userId) {
      getUser(parseInt(userId));
    }
  }, [userId]);

  const checkIfUserIsLoggedIn = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh_token`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      const decodedToken: JwtPayload = jwtDecode(data.accessToken);
      setUserId(decodedToken.id);

      if (data.message === "jwt expired" || data.message === "jwt must be provided") {
        return navigate("/login");
      }
    } catch (error: any) {
      console.log(error.message);
      return navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Root;
