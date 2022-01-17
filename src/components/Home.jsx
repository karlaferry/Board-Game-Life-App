import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { fetchTopReviews } from "../utils/api";

export default function Home() {
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchTopReviews()
      .then((res) => {
        setIsLoading(false);
        setDisplayedReviews(res);
      })
      .catch(console.log);
  }, []);
  return (
    <div>
      <div className="--home-main-bg"></div>
      <h1>Welcome to BGL!</h1>
      <Link to="/about">
        <button>About Us</button>
      </Link>
      <h2>Top Voted Reviews</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ReviewCard displayedReviews={displayedReviews} />
      )}
    </div>
  );
}
