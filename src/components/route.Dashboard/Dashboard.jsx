import { React, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Header from "../Header";

export default function Dashboard() {
  const {
    currentUser: { username, avatar_url, name },
    setCurrentUser,
  } = useContext(UserContext);
  const firstName = name.split(" ")[0];
  return (
    <div>
      <Header />
      <h2>Hello, {firstName}!</h2>
      <p>This is the dashboard.</p>
    </div>
  );
}
