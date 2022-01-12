import React from "react";
import { Link } from "react-router-dom";
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
              review_body,
              review_img_url,
              votes,
              comment_count,
            }) => {
              const snippet = review_body.split(" ").slice(0, 20).join(" ");
              return (
                <div>
                  <img src={review_img_url} alt="review image" width="50%" />
                  <h3>
                    <Link to={`/review/${review_id}`}>{title}</Link>
                  </h3>
                  <p>by: {owner}</p>
                  <p>{snippet}...</p>
                  <p>
                    {votes} Votes | {comment_count} Comments
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
