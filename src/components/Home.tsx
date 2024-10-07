import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // This ensures that HttpOnly cookies are sent with the request
      });

      if (res.ok) {
        // Optionally, clear user-specific data from client
        console.log("Logged out successfully.");
        return navigate("/login");
      } else {
        console.error("Failed to log out.");
      }
    } catch (error: any) {
      console.log(error.message);
      return navigate("/login");
    }
  };

  return (
    <div className="p-4">
      <button className="max-w-20" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
};

export default Home;
