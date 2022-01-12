// API REQUESTS HERE
import axios from "axios";

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

export const fetchReviews = ({ category, title, criteria }) => {
  if (category === "all-categories") {
    return myApi.get("/reviews", { params: criteria }).then(({ data }) => {
      return title === "all-reviews"
        ? data.reviews
        : data.reviews.filter((review) => {
            return review.title.toLowerCase().includes(title.toLowerCase());
          });
    });
  } else {
    return myApi
      .get(
        `/reviews?category=${category}&sort_by=${criteria.sort_by}&order=${criteria.order}`
      )
      .then(({ data }) => {
        return title === "all-reviews"
          ? data.reviews
          : data.reviews.filter((review) => {
              return review.title.toLowerCase().includes(title.toLowerCase());
            });
      });
  }
};

export const fetchUser = (username) => {
  return myApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const fetchReview = (id) => {
  return myApi.get(`/reviews/${id}`).then(({ data }) => {
    data.review.created_at = data.review.created_at.substring(0, 10);
    return data.review;
  });
};

export const patchVote = (id) => {
  return myApi.patch(`/reviews/${id}`, { inc_votes: 1 }).then((res) => {
    return res.data;
  });
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
    .then(({ data }) => {
      return data.comments;
    });
};

export const patchLikes = (id) => {
  return myApi.patch(`/comments/${id}`, { inc_votes: 1 }).then((res) => {
    return res.data;
  });
};

export const deleteComment = (id) => {
  return myApi.delete(`/comments/${id}`);
};
