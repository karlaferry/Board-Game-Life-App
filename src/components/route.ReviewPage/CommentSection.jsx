import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import {
  postComment,
  deleteComment,
  fetchComments,
  patchLikes,
} from "../../utils/api";

export default function CommentSection({
  setNewComment,
  newComment,
  review_id,
}) {
  const [displayComments, setDisplayComments] = useState([]);
  const [displayLikes, setDisplayLikes] = useState({});
  const [posting, setPosting] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    fetchComments(review_id).then((comments) => {
      setDisplayComments(comments);
      setDisplayLikes(() => {
        const likeObj = {};
        comments.forEach((comment) => {
          likeObj[comment.comment_id] = comment.votes;
        });
        return likeObj;
      });
    });
  }, [review_id, setDisplayLikes, posting]);

  const handleComment = (event) => {
    const comment = event.target.value;
    setNewComment(comment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(review_id, newComment, currentUser.username).then(() => {
      setPosting((currPosting) => {
        return !currPosting;
      });
      setNewComment("");
    });
  };

  const handleLike = (commentId) => {
    patchLikes(commentId);
    setDisplayLikes((currLikes) => {
      return { ...currLikes, [commentId]: currLikes[commentId] + 1 };
    });
  };

  const handleDelete = (comment_id) => {
    deleteComment(comment_id).then(() => {
      setPosting((currPosting) => {
        return !currPosting;
      });
      setNewComment("");
    });
  };

  return (
    <div>
      <h3>Leave a Comment</h3>
      {!currentUser.username ? (
        <p>
          Please <Link to="/login">login</Link> or{" "}
          <Link to="/register">register</Link> to leave a comment.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Leave a comment"
            onChange={handleComment}
            value={newComment}
          />
          <button>Submit</button>
        </form>
      )}

      {/* --------------- COMMENTS BLOCK --------------- */}
      <div>
        <h3>Comments ({displayComments.length})</h3>
        {displayComments.length > 0 &&
          displayComments.map((comment) => {
            return (
              <div key={comment.comment_id}>
                <h4>{comment.author}</h4>
                <p>{comment.created_at.substring(0, 10)}</p>
                <p>{comment.body}</p>
                <button
                  onClick={() => {
                    return currentUser.username
                      ? handleLike(comment.comment_id)
                      : alert("Please login to like a comment.");
                  }}
                >
                  {displayLikes[comment.comment_id]} 👍🏼
                </button>
                {currentUser.username === comment.author && (
                  <button
                    onClick={() => {
                      return handleDelete(comment.comment_id);
                    }}
                  >
                    Delete Comment
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
