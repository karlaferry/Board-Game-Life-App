import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const {
    currentUser: { username, avatar_url, name },
    setCurrentUser,
    setUsername,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    alert("You've been logged out.");
    setUsername("");
    setCurrentUser({});
    navigate("/");
  };
  return (
    <div>
      <Link to="/">BGL</Link>
      {username ? (
        <div>
          <p>
            <Link to={`/dashboard/${username}`}>Dashboard</Link>
          </p>
          <p>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <p>
            <Link to="/login">Login</Link>
          </p>
          <p>
            <Link to="/register">Register</Link>
          </p>
        </div>
      )}
      <h1>Board Game Life</h1>
    </div>
  );
}
