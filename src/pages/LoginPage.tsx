import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("email2@gmail.com");
  const [password, setPassword] = useState("Password2");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh_token`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (data.refreshToken) {
          return navigate("/");
        }
      } catch (error: any) {
        console.log(error.message);
        setError(error.message);
      }
    };

    checkIfUserIsLoggedIn();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setError("");
        return navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField value={email} handleChange={setEmail} type="email" inputName="email" required />
        <InputField value={password} handleChange={setPassword} type="password" inputName="password" required />

        <span className="text-red-400 min-h-6">{error}</span>

        <button type="submit">Login</button>
      </form>

      <span>
        Don't have an account?{" "}
        <Link to="/register">
          <u>Sign up</u>
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
