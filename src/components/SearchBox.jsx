import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../utils/api";
import { capitaliseString } from "../utils/utilFuncs";
import { QueryContext } from "../contexts/QueryContext";

export default function SearchBox() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { query, setQuery } = useContext(QueryContext);

  let navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchCategories().then((res) => {
      setCategories(res);
      setIsLoading(false);
    });
  }, []);
  console.log(query);
  const handleCategory = (event) => {
    const category = event.target.value;
    setQuery((currentQuery) => {
      return { ...currentQuery, category: category };
    });
  };

  const handleTitle = (event) => {
    const title = event.target.value;
    if (title === "") {
      setQuery((currentQuery) => {
        return { ...currentQuery, title: "all-reviews" };
      });
    } else {
      setQuery((currentQuery) => {
        return { ...currentQuery, title: title };
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/reviews/${query.category}/${query.title}`);
  };

  return (
    <div>
      <h2>Search</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <select name="categories" onChange={handleCategory}>
            <option value="all-categories" defaultValue>
              All
            </option>
            {categories.map((category) => {
              return (
                <option value={category} key={category}>
                  {capitaliseString(category)}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Review Title"
            onChange={handleTitle}
          />
          <button>🔍</button>
        </form>
      )}
    </div>
  );
}
