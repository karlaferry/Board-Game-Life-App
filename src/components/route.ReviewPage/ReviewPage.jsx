import React from "react";
import { useParams } from "react-router";
import Header from "../Header";
import SearchBox from "../SearchBox";

export default function ReviewPage() {
  const { review_id } = useParams();
  return (
    <div>
      <Header />
      <SearchBox />
      <h2></h2>
    </div>
  );
}
