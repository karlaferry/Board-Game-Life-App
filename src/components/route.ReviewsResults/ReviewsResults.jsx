// Dependency Imports
import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { QueryContext } from "../../contexts/QueryContext";
import { fetchReviews } from "../../utils/api";
import { capitaliseString } from "../../utils/utilFuncs";
import ErrorComponent from "../ErrorComponent";

// Component Imports
import SearchBox from "../SearchBox";
import ReviewCard from "./ReviewCard";

export default function ReviewsResults() {
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const {
    query: { criteria },
  } = useContext(QueryContext);
  const { category, title } = useParams();
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchReviews(category, title, criteria)
      .then((res) => {
        setDisplayedReviews(res);
      })
      .catch((err) => {
        setError([err.response.status, err.response.data.msg]);
      });
  }, [criteria, category, title]);

  return (
    <div>
      <SearchBox />
      {error ? (
        <ErrorComponent err={error} />
      ) : (
        <div>
          <h2>{capitaliseString(category)}</h2>
          <ReviewCard displayedReviews={displayedReviews} />
        </div>
      )}
    </div>
  );
}
