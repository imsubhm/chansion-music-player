import React from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { FaPlay, FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import logout from "../../screens/auth/logout";
import { useNavigate } from "react-router-dom";
import { GiMusicSpell } from "react-icons/gi";

export default function Sidebar() {
  const navigate = useNavigate();
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }
  const handleLogout = async () => {
    navigate("/");
    logout();
    refreshPage();
  };

  return (
    <div className="sidebar-container">
      <h1>
        <GiMusicSpell className="music-icon" />
        CM <span>Player</span>
      </h1>

      <div>
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />

        <SidebarButton title="Library" to="/library" icon={<IoLibrary />} />
      </div>
      <button className="sign-out" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}
