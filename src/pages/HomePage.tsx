import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../components/Home";
import { useUser } from "./root";

const HomePage = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  // useEffect(() => {
  //   checkIfUserIsLoggedIn();
  // }, []);

  // const checkIfUserIsLoggedIn = async () => {
  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh_token`, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     console.log(data);

  //     if (data.message === "jwt expired" || data.message === "jwt must be provided") {
  //       return navigate("/login");
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //     return navigate("/login");
  //   }
  // };

  return <Home />;
};

export default HomePage;
