// Dependency Imports
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../utils/api";
import { capitaliseString } from "../../utils/utilFuncs";

// Component Imports
import Header from "../Header";
import SearchBox from "../SearchBox";
import ReviewCard from "./ReviewCard";

export default function ReviewsResults() {
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const { category, title } = useParams();

  useEffect(() => {
    fetchReviews(category, title).then((res) => {
      setDisplayedReviews(res);
    });
  }, [category, title]);

  return (
    <div>
      <Header />
      <SearchBox />
      <h2>{capitaliseString(category)}</h2>
      <ReviewCard displayedReviews={displayedReviews} />
    </div>
  );
}
