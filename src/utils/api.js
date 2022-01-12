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
    return data.categories.map((category) => category.slug);
  });
};

export const fetchReviews = (category, title) => {
  if (category === "all-categories") {
    return myApi.get("/reviews").then(({ data }) => {
      return title === "all-reviews"
        ? data.reviews
        : data.reviews.filter((review) => {
            return review.title.toLowerCase().includes(title.toLowerCase());
          });
    });
  } else {
    return myApi.get(`/reviews?category=${category}`).then(({ data }) => {
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
