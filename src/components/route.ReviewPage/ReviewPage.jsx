import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import SearchBox from "../SearchBox";
import CommentSection from "./CommentSection";
import { fetchReview, patchVote } from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";

export default function ReviewPage() {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [displayVotes, setDisplayVotes] = useState(0);
  const [displayLikes, setDisplayLikes] = useState({});
  const [newComment, setNewComment] = useState("");
  const { review_id } = useParams();
  const {
    currentUser: { username },
  } = useContext(UserContext);

  useEffect(() => {
    setNewComment("");
    setIsLoading(true);
    fetchReview(review_id)
      .then((review) => {
        setIsLoading(false);
        setReview(review);

        setDisplayVotes(review.votes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [review_id]);

  const {
    review_id: id,
    title,
    review_body: body,
    review_img_url: img,
    owner,
    created_at: date,
  } = review;

  const handleVote = () => {
    if (username) {
      patchVote(id);
      setDisplayVotes((currVotes) => {
        return currVotes + 1;
      });
    } else {
      alert("Please login to vote for a review.");
    }
  };

  return (
    <div>
      <Header />
      <SearchBox />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section>
          {/* --------------- REVIEW BLOCK --------------- */}
          <div>
            <img src={img} alt="board game review" width="100%" />
            <h2>{title}</h2>
            <p>
              by {owner} on {date}
            </p>
            <button onClick={handleVote}>{displayVotes} ⬆️</button>
            <h3>Review</h3>
            <p>{body}</p>
          </div>

          {/*---------------  COMMENT BLOCK --------------- */}
          <CommentSection
            setNewComment={setNewComment}
            newComment={newComment}
            review_id={review_id}
            displayLikes={displayLikes}
            setDisplayLikes={setDisplayLikes}
          />
        </section>
      )}
    </div>
  );
}
