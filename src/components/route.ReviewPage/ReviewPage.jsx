import { React, useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Header";
import SearchBox from "../SearchBox";
import {
  fetchReview,
  patchVote,
  postComment,
  fetchComments,
  patchLikes,
} from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";

export default function ReviewPage() {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [displayVotes, setDisplayVotes] = useState(0);
  const [displayComments, setDisplayComments] = useState([]);
  const [displayLikes, setDisplayLikes] = useState({});
  const [newComment, setNewComment] = useState("");
  const { review_id } = useParams();
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    setNewComment("");
    setIsLoading(true);
    return Promise.all([fetchReview(review_id), fetchComments(review_id)])
      .then(([review, comments]) => {
        setIsLoading(false);
        setReview(review);
        setDisplayComments(comments);
        setDisplayLikes(() => {
          const likeObj = {};
          comments.forEach((comment) => {
            likeObj[comment.comment_id] = comment.votes;
          });
          return likeObj;
        });
        setDisplayVotes(review.votes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [review_id]);
  console.log(displayLikes);
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
  } = review;

  const handleVote = () => {
    patchVote(id);
    setDisplayVotes((currVotes) => {
      return currVotes + 1;
    });
  };
  const handleLike = (commentId) => {
    patchLikes(commentId);
    setDisplayLikes((currLikes) => {
      return { ...currLikes, [commentId]: currLikes[commentId] + 1 };
    });
  };

  const handleComment = (event) => {
    const comment = event.target.value;
    setNewComment(comment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(id, newComment, currentUser.username);
  };
  return (
    <div>
      <Header />
      <SearchBox />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section>
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
          <div>
            <h3>Leave a Comment</h3>
            {!currentUser.username ? (
              <p>
                Please <Link to="/login">log in</Link> or{" "}
                <Link to="/register">register</Link> to leave a comment.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <textarea
                  placeholder="Leave a comment"
                  onChange={handleComment}
                />
                <button>Submit</button>
              </form>
            )}
            <div>
              <h3>Comments</h3>
              {displayComments.length > 0 &&
                displayComments.map((comment) => {
                  return (
                    <div key={comment.comment_id}>
                      <h4>{comment.author}</h4>
                      <p>{comment.created_at.substring(0, 10)}</p>
                      <p>{comment.body}</p>
                      {currentUser.username && (
                        <button
                          onClick={() => {
                            return handleLike(comment.comment_id);
                          }}
                        >
                          {displayLikes[comment.comment_id]} 👍🏼
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
