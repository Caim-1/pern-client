import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { User } from "../types/globals";

type JwtPayload = {
  id: string;
};

type ContextType = { currentUser: User | null };

const Root = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    checkIfUserIsLoggedIn();

    if (userId) {
      const id = parseInt(userId);
      getUser(id);
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

  const getUser = async (id: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      setCurrentUser(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar user={currentUser} />
      <div className="flex flex-1">
        <Sidebar />
        {currentUser && <Outlet context={{ currentUser } satisfies ContextType} />}
      </div>
    </>
  );
};

export function useUser() {
  return useOutletContext<ContextType>();
}

export default Root;
