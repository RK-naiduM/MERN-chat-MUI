import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to Our Platform</h2>
      <button className="btn" onClick={() => navigate("/register")}> Register</button>
      <h1></h1>
      <button className="btn" onClick={() => navigate("/login")}> Login</button>
    </div>
  );
};

export default Home;
