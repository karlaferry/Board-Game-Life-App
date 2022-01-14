// API REQUESTS HERE
import axios from "axios";
import { filterTitle } from "./utilFuncs";

const myApi = axios.create({
  baseURL: "https://gamersofthenorth.herokuapp.com/api",
});

export const fetchTopReviews = () => {
  return myApi.get("/reviews?sort_by=votes&order=desc").then(({ data }) => {
    return data.reviews.slice(0, 5);
  });
};

export const fetchCategories = () => {
  return myApi.get("/categories").then(({ data }) => {
    return data.categories.map((category) => category.slug).sort();
  });
};

export const fetchReviews = (category, title, criteria) => {
  const { sort_by, order } = criteria;
  return myApi
    .get(
      `/reviews${
        category === "all-categories" ? "?" : `?category=${category}&`
      }sort_by=${sort_by}&order=${order}`
    )
    .then(({ data: { reviews } }) => {
      return filterTitle(reviews, title);
    });
};

export const fetchUser = (username) => {
  return myApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const fetchReview = (id) => {
  return myApi.get(`/reviews/${id}`).then(({ data: { review } }) => {
    return review;
  });
};

// Patch votes for both comments and reviews
export const patchVote = (id, type) => {
  return myApi.patch(`/${type}/${id}`, { inc_votes: 1 });
};

export const postComment = (id, comment, username) => {
  return myApi.post(`/reviews/${id}/comments`, {
    username,
    body: comment,
  });
};

export const fetchComments = (id) => {
  return myApi
    .get(`/reviews/${id}/comments?sort_by=created_at&order=desc`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const deleteComment = (id) => {
  return myApi.delete(`/comments/${id}`);
};

export const postUser = (username, fullName) => {
  return myApi.post("/users/", { username, name: fullName });
};

export const fetchCommentsByUser = (username) => {
  return myApi
    .get(`/comments/user/${username}`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};
