import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebarButton.css";

export default function SidebarButton(props) {
  return (
    <div>
      <NavLink to={props.to} className="btn-body">
        <span className="btn-icon">{props.icon}</span>
        <p className="btn-title">{props.title}</p>
      </NavLink>
    </div>
  );
}
