import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { fetchUser, fetchCommentsByUser } from "../../utils/api";
import Header from "../Header";
import SearchBox from "../SearchBox";

export default function Dashboard() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
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
      <Header />
      <SearchBox />
      <h2>Hello, {currentUser.name}!</h2>
      <h3>Account</h3>
      <h3>Your Comments</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : userComments.length <= 0 ? (
        <p>You haven't posted any comments.</p>
      ) : (
        <div>
          {userComments.map((comment) => {
            return (
              <div key={comment.comment_id}>
                <p>{comment.body}</p>
              </div>
            );
          })}
        </div>
      )}
      <p>This is the dashboard.</p>
    </div>
  );
}
