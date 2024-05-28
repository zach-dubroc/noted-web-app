import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
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

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>{name}</h1>
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
        autoComplete="current-password"
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
  );
}

export default Form;
