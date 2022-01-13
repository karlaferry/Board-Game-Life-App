import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import {
  postComment,
  deleteComment,
  fetchComments,
  patchVote,
} from "../../utils/api";
import { convertDate } from "../../utils/utilFuncs";

export default function CommentSection({
  setNewComment,
  newComment,
  review_id,
}) {
  const [displayComments, setDisplayComments] = useState([]);
  const [displayLikes, setDisplayLikes] = useState({});
  const [posting, setPosting] = useState(false);
  const {
    currentUser: { username },
  } = useContext(UserContext);

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
    postComment(review_id, newComment, username).then(() => {
      setPosting((currPosting) => {
        return !currPosting;
      });
      setNewComment("");
    });
  };

  const handleLike = (commentId) => {
    patchVote(commentId, "comments");
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
      {!username ? (
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
            required
          />
          <button>Submit</button>
        </form>
      )}

      {/* --------------- COMMENTS BLOCK --------------- */}
      <div>
        <h3>Comments ({displayComments.length})</h3>
        {displayComments.length > 0 &&
          displayComments.map((comment) => {
            const { comment_id, author, created_at, body, votes } = comment;
            return (
              <div key={comment_id}>
                <h4>{author}</h4>
                <p>{convertDate(created_at)}</p>
                <p>{body}</p>
                <button
                  onClick={() => {
                    return username
                      ? handleLike(comment_id)
                      : alert("Please login to like a comment.");
                  }}
                  disabled={votes < displayLikes[comment_id]}
                >
                  {displayLikes[comment_id]} 👍🏼
                </button>
                {username === author && (
                  <button
                    onClick={() => {
                      return handleDelete(comment_id);
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
