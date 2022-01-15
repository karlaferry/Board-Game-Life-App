import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getFirstName } from "../utils/utilFuncs";
import SearchBox from "./SearchBox";

export default function Header() {
  const {
    currentUser: { username, name },
    setCurrentUser,
    setUsername,
    setFullName,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("You've been logged out.");
    setUsername("");
    setFullName("");
    setCurrentUser({});
    navigate("/");
  };
  return (
    <div>
      {/* BGL LOGO */}
      <Link to="/">BGL</Link>
      <div>
        <SearchBox />
      </div>
      <div>
        {username ? (
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to={`/dashboard/${username}`}>
                Dashboard ({getFirstName(name)})
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
      </div>
      <h1>Board Game Life</h1>
    </div>
  );
}
