import React from "react";
import Header from "../Header";
import { useParams } from "react-router-dom";
export default function Dashboard() {
  const { username } = useParams();
  return (
    <div>
      <Header />
      <h2>Hello, {username}!</h2>
      <p>This is the dashboard.</p>
    </div>
  );
}
