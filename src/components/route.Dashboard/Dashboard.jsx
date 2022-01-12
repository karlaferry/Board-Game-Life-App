import { React, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { UserContext } from "../../contexts/UserContext";

export default function Dashboard() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { username } = useParams();
  console.log(currentUser);
  return (
    <div>
      <Header />
      <h2>Hello, {currentUser.username}!</h2>
      <p>This is the dashboard.</p>
    </div>
  );
}
