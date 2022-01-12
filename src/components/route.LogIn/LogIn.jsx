import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import { UserContext } from "../../contexts/UserContext";
import { fetchUser } from "../../utils/api";

export default function LogIn() {
  const [isError, setIsError] = useState(false);
  const { username, setUsername, currentUser, setCurrentUser } =
    useContext(UserContext);
  let navigate = useNavigate();
  const handleUserInput = (event) => {
    const username = event.target.value;
    setUsername(username);
  };
  const handleSignIn = (event) => {
    setIsError(false);
    event.preventDefault();
    fetchUser(username)
      .then((res) => {
        setCurrentUser(res);
        navigate(`/dashboard/${username}`);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <div>
      <Header />
      <h2>Login</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          required
          placeholder="Username"
          onChange={handleUserInput}
          value={username}
        />
        <button>Login</button>
      </form>
      {isError && (
        <p>
          User does not exist. <Link to="/register">Register instead.</Link>
        </p>
      )}
    </div>
  );
}
