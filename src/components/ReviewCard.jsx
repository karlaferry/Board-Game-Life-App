import React from "react";
import { Link } from "react-router-dom";
import { convertDate } from "../utils/utilFuncs";
import "../App.css";

export default function ReviewCard({ displayedReviews }) {
  return (
    <div>
      {displayedReviews.length <= 0 ? (
        <p>No results.</p>
      ) : (
        <div>
          {displayedReviews.map(
            ({
              review_id,
              title,
              owner,
              created_at: date,
              review_body,
              review_img_url,
              votes,
              comment_count,
            }) => {
              const snippet = review_body.split(" ").slice(0, 20).join(" ");
              return (
                <div key={review_id}>
                  <img
                    src={review_img_url}
                    alt="board game review"
                    width="100%"
                  />

                  <Link to={`/review/${review_id}`}>
                    <h3>{title}</h3>
                  </Link>

                  <p>
                    by {owner} on {convertDate(date)}
                  </p>
                  <p>{snippet}...</p>
                  <p>
                    {votes} {votes <= 1 ? "Vote" : "Votes"} | {comment_count}{" "}
                    {comment_count <= 1 ? "Comment" : "Comments"}
                  </p>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
