import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";

function Form(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const name = props.method === "login" ? "Login" : "Register";

  const handleClick = (e) => {
    props.method === "register" ? navigate("/login") : navigate("/register");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      //send to api/token
      //method sets to post on register?
      const res = await api.post(props.method, { username, password });
      if (props.method === "login") {
        setReg(true);
        //gets access token if logins succesful
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");

        //to home page
      } else {
        //if register was method, send back to login to get tokens
        navigate("/login");
      }
    } catch (error) {
      //add more error catches
    } finally {
      setLoading(false);
    }
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
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {name}
      </button>

      {props.method === "login" ? (
        <button className="form-button" onClick={handleClick}>
          Register
        </button>
      ) : (
        <button className="form-button" onClick={handleClick}>
          Login
        </button>
      )}
    </form>
  );
}

export default Form;
