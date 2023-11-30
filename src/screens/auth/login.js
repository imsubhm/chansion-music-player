import React from "react";
import { loginEndpoint } from "../../Api";
import "./login.css";

export default function Login() {
  return (
    <div className="login-page">
      <img
        src={require("../../image/Chanson Music Player.png")}
        alt="Chanson Music Player"
        className="logo"
      />
      <a href={loginEndpoint}>
        <button className="login-btn">LOG IN</button>
      </a>
      <button className="hover">Before Login!</button>
      <div className="show">
        <p>For testing the app you need this:</p>
        <p>Login Id : testone1user1@gmail.com</p>
        <p>Password : Test@1234</p>
      </div>
    </div>
  );
}
