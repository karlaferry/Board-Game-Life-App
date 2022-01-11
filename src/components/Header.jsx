import { React } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to="/">BGL</Link>
      <p>
        <Link to="/about">About</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </p>
      <h1>Board Game Life</h1>
    </div>
  );
}
