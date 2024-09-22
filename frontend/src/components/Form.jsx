import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";

function Form({ route, method }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const data = {
        email, // Send the email if it's available (used in registration)
        username, // Send the username
        password, // Send the password
      };

      const res = await api.post(route, data);
      if (method === "login") {
        // Set access and refresh tokens
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        // Navigate to the home page
        navigate("/");
      } else {
        // If the method is register, navigate to the login page
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNav = (path) => {
    navigate(path);
  };
  // could seperate to more components but fn just ternary to return
  // either login/register pages
  return method === "login" ? (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>{name}</h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="email/username"
      />

      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      {loading && <LoadingIndicator />}

      <button className="form-button" type="submit">
        {name}
      </button>

      {method === "login" ? (
        <button className="form-button" onClick={() => handleNav("/register")}>
          Register
        </button>
      ) : (
        <button className="form-button" onClick={() => handleNav("/login")}>
          Login
        </button>
      )}
    </form>
  ) : (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <input
        type="text"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />

      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />

      {loading && <LoadingIndicator />}
      {/* top btn login/register */}
      <button className="form-button" type="submit">
        {name}
      </button>
      {/* bottom btn alternates methods */}
      {method === "login" ? (
        <button className="form-button" onClick={() => handleNav("/register")}>
          Register
        </button>
      ) : (
        <button className="form-button" onClick={() => handleNav("/login")}>
          Back to Login
        </button>
      )}
    </form>
  );
}

export default Form;
