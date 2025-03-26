import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";

const UserMenu = () => {
  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name); // Ensure the user object has a `name` field
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  return (
    <div className="user-menu-wrapper">
      <IconButton onClick={handleMenuClick} style={styles.iconButton}>
        <FaUser size={24} />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>
          <Typography variant="body1">{userName || "Guest"}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

// Styles for positioning the icon in the right corner
const styles = {
  iconButton: {
    position: "fixed",  // Fixes the button at a specific position
    top: "20px",        // 20px from the top of the page
    right: "20px",      // 20px from the right of the page
    zIndex: 1000,       // Ensure it stays on top of other elements
  },
};

export default UserMenu;
