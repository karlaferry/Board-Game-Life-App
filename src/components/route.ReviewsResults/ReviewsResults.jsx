// Dependency Imports
import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { QueryContext } from "../../contexts/QueryContext";
import { fetchReviews } from "../../utils/api";
import { capitaliseString } from "../../utils/utilFuncs";
import ErrorComponent from "../ErrorComponent";

// Component Imports
import ReviewCard from "./ReviewCard";

export default function ReviewsResults() {
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [page, setPage] = useState(1);
  const {
    query: { criteria },
    query,
  } = useContext(QueryContext);
  const { category } = useParams();
  const [error, setError] = useState(null);

  // COMPONENT
  useEffect(() => {
    setError(null);
    fetchReviews(category, criteria, page)
      .then((res) => {
        setDisplayedReviews(res);
      })
      .catch((err) => {
        setError([err.response.status, err.response.data.msg]);
      });
  }, [query, criteria, category, page]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleNext = () => {
    setPage((currPage) => {
      return currPage + 1;
    });
  };

  const handlePrevious = () => {
    setPage((currPage) => {
      return currPage - 1;
    });
  };

  return (
    <div>
      {error ? (
        <ErrorComponent err={error} />
      ) : (
        <div>
          <h2 id="reviews">{capitaliseString(category)}</h2>
          <ReviewCard displayedReviews={displayedReviews} />
          <button onClick={handlePrevious} disabled={page === 1}>
            Previous
          </button>
          <p>{page}</p>
          <button onClick={handleNext} disabled={displayedReviews.length < 5}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
