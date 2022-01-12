// Dependency Imports
import { React, useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
import { QueryContext } from "../../contexts/QueryContext";
import { fetchReviews } from "../../utils/api";
import { capitaliseString } from "../../utils/utilFuncs";

// Component Imports
import Header from "../Header";
import SearchBox from "../SearchBox";
import ReviewCard from "./ReviewCard";

export default function ReviewsResults() {
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const { query } = useContext(QueryContext);
  useEffect(() => {
    fetchReviews(query).then((res) => {
      setDisplayedReviews(res);
    });
  }, [query]);

  return (
    <div>
      <Header />
      <SearchBox />
      <h2>{capitaliseString(query.category)}</h2>
      <ReviewCard displayedReviews={displayedReviews} />
    </div>
  );
}
