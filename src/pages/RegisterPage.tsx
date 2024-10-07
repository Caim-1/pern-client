import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmitEmail = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.match(validEmailRegex)) {
      setError("Invalid email format");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`);
      const data = await res.json();
      const existingEmail = data.find((user: any) => user.email === email);

      if (existingEmail) {
        setError("Email is already registered");
      } else {
        setError("");
        setStep(step + 1);
      }
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleSubmitCredentials = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("The password must be at least 8 characters");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords don't match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setError("");
        // Proceed...
        console.log(data);
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl">Register</h1>

      {step === 1 && (
        <form onSubmit={handleSubmitEmail} className="flex flex-col gap-4">
          <InputField value={email} handleChange={setEmail} type="email" inputName="email" required />

          <span className="text-red-400 min-h-6">{error}</span>

          <div className="flex gap-4">
            <button type="submit" className="flex-1">
              Next
            </button>
            <button type="button" className="flex-1" disabled>
              Back
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitCredentials} className="flex flex-col gap-4">
          <InputField value={username} handleChange={setUsername} type="text" inputName="username" required />
          <InputField value={password} handleChange={setPassword} type="password" inputName="password" required />
          <InputField
            value={confirmPassword}
            handleChange={setConfirmPassword}
            type="password"
            inputName="confirm password"
            required
          />

          <span className="text-red-400 min-h-6">{error}</span>

          <div className="flex gap-4">
            <button type="submit" className="flex-1">
              Next
            </button>
            <button
              type="button"
              className="flex-1"
              onClick={() => {
                setStep(step - 1);
                setError("");
              }}
            >
              Back
            </button>
          </div>
        </form>
      )}

      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField value={email} handleChange={setEmail} error={emailError} type="email" inputName="email" required />
        <InputField value={username} handleChange={setUsername} type="text" inputName="username" required />
        <InputField
          value={password}
          handleChange={setPassword}
          error={passwordError}
          type="password"
          inputName="password"
          required
        />
        <InputField
          value={confirmPassword}
          handleChange={setConfirmPassword}
          type="password"
          inputName="confirm password"
          required
        />

        <span className="text-red-400 min-h-6">{error}</span>

        <button type="submit">Register</button>
      </form> */}

      <span>
        Already have an account?{" "}
        <Link to="/login">
          <u>Log in</u>
        </Link>
      </span>
    </div>
  );
};

export default RegisterPage;
