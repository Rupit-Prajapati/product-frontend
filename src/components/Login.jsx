import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    var response = await fetch(`http://localhost:5000/login`, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    if (response.auth) {
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", JSON.stringify(response.auth));
      navigate("/");
    } else {
      alert("no user found");
    }
  };
  return (
    <div className="login">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        className="inputBox"
        placeholder="Enter Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="inputBox"
        placeholder="Enter Password"
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Log In
      </button>
    </div>
  );
};

export default Login;
