import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../utils/api";
import { capitaliseString } from "../../utils/utilFuncs";
import Header from "../Header";
import SearchBox from "../SearchBox";

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
      <h2>
        {capitaliseString(category)} - {capitaliseString(title)}
      </h2>
      {displayedReviews.length <= 0 ? (
        <p>No results.</p>
      ) : (
        <ul>
          {displayedReviews.map((review) => (
            <li key={review.review_id}>{review.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
