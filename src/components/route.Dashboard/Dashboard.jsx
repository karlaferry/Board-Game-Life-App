import { React, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { fetchUser } from "../../utils/api";
import Header from "../Header";
import SearchBox from "../SearchBox";

export default function Dashboard() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { username } = useParams();

  useEffect(() => {
    fetchUser(username).then((res) => {
      setCurrentUser(res);
    });
  }, [setCurrentUser, username]);

  return (
    <div>
      <Header />
      <h2>Hello, {currentUser.name}!</h2>
      <h3>Account</h3>
      <h3>Your Comments</h3>
      <p>This is the dashboard.</p>
      <SearchBox />
    </div>
  );
}
