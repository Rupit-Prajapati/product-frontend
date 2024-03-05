import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    const data = {
      name,
      email,
      password,
    };
    var response = await fetch(`http://localhost:5000/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    localStorage.setItem("user", JSON.stringify(response.result));
    localStorage.setItem("token", JSON.stringify(response.auth));
    navigate("/");
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="inputBox"
        placeholder="Enter Name"
      />
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
      <button onClick={collectData} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
