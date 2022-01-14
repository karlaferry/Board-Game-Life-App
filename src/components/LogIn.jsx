import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { fetchUser } from "../utils/api";

export default function LogIn() {
  const [isError, setIsError] = useState(false);
  const { username, setUsername, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUserInput = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const handleSignIn = (event) => {
    setIsError(false);
    event.preventDefault();
    fetchUser(username)
      .then((user) => {
        navigate(`/dashboard/${username}`);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return (
    <div>
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
        <>
          <p>User does not exist.</p>
          <Link to="/register">Register instead.</Link>
        </>
      )}
    </div>
  );
}
