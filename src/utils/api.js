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
