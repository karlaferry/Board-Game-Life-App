import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getFirstName } from "../utils/utilFuncs";
import SearchBox from "./SearchBox";
import meeple from "../img/meeple.png";

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
      <Link to="/">
        <div className="header">
          <img className="header--logo" src={meeple} alt="meeple" />
          <h1 className="header--title">Board Game Life</h1>
        </div>
      </Link>
      <div>
        {username ? (
          <ul className="header--nav">
            <li>
              <Link to="/">Home</Link>
            </li>
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
          <ul className="header--nav">
            <li>
              <Link to="/">Home</Link>
            </li>
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
        <div>
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
