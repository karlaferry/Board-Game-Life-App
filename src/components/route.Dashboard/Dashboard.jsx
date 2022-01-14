import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { fetchUser, fetchCommentsByUser } from "../../utils/api";
import { getFirstName, convertDate } from "../../utils/utilFuncs";
import Header from "../Header";
import SearchBox from "../SearchBox";

export default function Dashboard() {
  const {
    currentUser: { name, avatar_url },
    setCurrentUser,
  } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userComments, setUserComments] = useState([]);
  const { username } = useParams();
  useEffect(() => {
    setIsLoading(true);
    return Promise.all([
      fetchUser(username),
      fetchCommentsByUser(username),
    ]).then(([user, userComments]) => {
      setIsLoading(false);
      setUserComments(userComments);
      setCurrentUser(user);
    });
  }, [setCurrentUser, username]);
  return (
    <div>
      <SearchBox />
      <h2>Hello, {getFirstName(name)}!</h2>
      <div>
        <h3>Account</h3>
        <img src={avatar_url} alt="user avatar" width="50%" />
        <p>Username: {username}</p>
      </div>
      <h3>Your Comments</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : userComments.length <= 0 ? (
        <p>You haven't posted any comments.</p>
      ) : (
        <div>
          {userComments.map((comment) => {
            const { comment_id, created_at, body, votes } = comment;
            return (
              <div key={comment_id}>
                <p>{convertDate(created_at)}</p>
                <p>{body}</p>
                <p>
                  {votes} {votes <= 1 ? "Like" : "Likes"}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <p>This is the dashboard.</p>
    </div>
  );
}
