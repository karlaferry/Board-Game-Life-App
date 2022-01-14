import { React, useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { fetchUser, fetchCommentsByUser } from "../utils/api";
import { getFirstName, convertDate } from "../utils/utilFuncs";

export default function Dashboard() {
  const {
    currentUser: { name, avatar_url },
    currentUser,
    setCurrentUser,
  } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userComments, setUserComments] = useState([]);
  const [isError, setIsError] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    return Promise.all([fetchUser(username), fetchCommentsByUser(username)])
      .then(([user, userComments]) => {
        setIsLoading(false);
        setUserComments(userComments);
        setCurrentUser(user);
      })
      .catch(console.log);
  }, [setCurrentUser, username]);

  return (
    <div>
      <h2>Hello, {getFirstName(name)}!</h2>
      <div>
        <h3>Account</h3>
        <img src={avatar_url} alt="user avatar" width="50%" />
        <p>Username: {username}</p>
      </div>
      <div>
        <h3>Your Comments</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : userComments.length <= 0 ? (
          <p>You haven't posted any comments.</p>
        ) : (
          <div>
            {userComments.map((comment) => {
              const { comment_id, review_id, created_at, body, votes } =
                comment;
              return (
                <div key={comment_id}>
                  <Link to={`/review/${review_id}`}>
                    <p>{convertDate(created_at)}</p>
                  </Link>
                  <p>{body}</p>
                  <p>
                    {votes} {votes <= 1 ? "Like" : "Likes"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
