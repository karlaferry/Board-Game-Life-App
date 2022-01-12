import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import Header from "../Header";
import SearchBox from "../SearchBox";
import { fetchReview, patchVote } from "../../utils/api";

export default function ReviewPage() {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [displayVotes, setDisplayVotes] = useState(0);
  const { review_id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    fetchReview(review_id)
      .then((res) => {
        setIsLoading(false);
        setReview(res);
        setDisplayVotes(res.votes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [review_id]);
  const {
    review_id: id,
    title,
    review_body: body,
    designer,
    review_img_url: img,
    votes,
    comment_count: comments,
    owner,
    created_at: date,
    category,
  } = review;

  const handleVote = () => {
    patchVote(id);
    setDisplayVotes((currVotes) => {
      return currVotes + 1;
    });
  };
  return (
    <div>
      <Header />
      <SearchBox />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section>
          <img src={img} alt="board game review" width="100%" />
          <h2>{title}</h2>
          <p>
            by {owner} on {date}
          </p>
          <button onClick={handleVote}>{displayVotes} Votes</button>
        </section>
      )}
    </div>
  );
}
