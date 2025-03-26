import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = ({ tier }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || user?.tier !== tier) {
      navigate("/login");
    }
  }, [navigate, tier]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <h1>Welcome to the {tier} Page</h1>
      <p>You have {tier}-level access.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
