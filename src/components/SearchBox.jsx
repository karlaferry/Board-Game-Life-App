import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../utils/api";
import { capitaliseString } from "../utils/utilFuncs";
import { QueryContext } from "../contexts/QueryContext";

export default function SearchBox() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newQuery, setNewQuery] = useState({
    category: "all-categories",
    criteria: { sort_by: "title", order: "asc" },
  });
  const { setQuery } = useContext(QueryContext);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    fetchCategories()
      .then((res) => {
        setCategories(res);
        setIsLoading(false);
      })
      .catch(console.log);
  }, []);

  const handleCategory = (event) => {
    const category = event.target.value;
    setNewQuery((currentQuery) => {
      return { ...currentQuery, category: category };
    });
  };

  const handleCriteria = (event) => {
    setNewQuery((currentQuery) => {
      return {
        ...currentQuery,
        criteria: JSON.parse(event.target.value),
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(newQuery);
    navigate(`/reviews/${newQuery.category}`);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form className="searchbar" onSubmit={handleSubmit}>
          <select
            name="categories"
            onChange={handleCategory}
            className="searchbar--categories"
          >
            <option value="all-categories" defaultValue>
              All Categories
            </option>
            {categories.map((category) => {
              return (
                <option value={category} key={category}>
                  {capitaliseString(category)}
                </option>
              );
            })}
          </select>
          <select
            name="criteria"
            onChange={handleCriteria}
            className="searchbar--sort"
          >
            <option value='{ "sort_by": "title", "order": "asc" }' defaultValue>
              Sort By Title
            </option>
            <option value='{ "sort_by": "created_at", "order": "desc" }'>
              Newest
            </option>
            <option value='{ "sort_by": "created_at", "order": "asc" }'>
              Oldest
            </option>
            <option value='{ "sort_by": "comment_count", "order": "desc" }'>
              Comments: High to Low
            </option>
            <option value='{ "sort_by": "comment_count", "order": "asc" }'>
              Comments: Low to High
            </option>
            <option value='{ "sort_by": "votes", "order": "desc" }'>
              Votes: High to Low
            </option>
            <option value='{ "sort_by": "votes", "order": "asc" }'>
              Votes: Low to High
            </option>
          </select>
          <button className="searchbar--button">🔍</button>
        </form>
      )}
    </div>
  );
}
