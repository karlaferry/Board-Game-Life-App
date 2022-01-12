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
    title: "all-reviews",
    criteria: { sort_by: "title", order: "asc" },
  });
  const { query, setQuery } = useContext(QueryContext);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    fetchCategories().then((res) => {
      setCategories(res);
      setIsLoading(false);
    });
  }, []);

  const handleCategory = (event) => {
    const category = event.target.value;
    console.log(category);
    setNewQuery((currentQuery) => {
      return { ...currentQuery, category: category };
    });
  };

  const handleTitle = (event) => {
    const title = event.target.value;
    if (title === "") {
      setNewQuery((currentQuery) => {
        return { ...currentQuery, title: "all-reviews" };
      });
    } else {
      setNewQuery((currentQuery) => {
        return { ...currentQuery, title: title };
      });
    }
  };
  const handleCriteria = (event) => {
    const criteria = event.target.value;
    if (criteria === "title") {
      setNewQuery((currentQuery) => {
        return {
          ...currentQuery,
          criteria: { sort_by: "title", order: "asc" },
        };
      });
    }
    if (criteria === "votes-h-l") {
      setNewQuery((currentQuery) => {
        return {
          ...currentQuery,
          criteria: { sort_by: "votes", order: "desc" },
        };
      });
    } else if (criteria === "votes-l-h") {
      setNewQuery((currentQuery) => {
        return {
          ...currentQuery,
          criteria: { sort_by: "votes", order: "asc" },
        };
      });
    } else if (criteria === "comments-h-l") {
      setNewQuery((currentQuery) => {
        return {
          ...currentQuery,
          criteria: { sort_by: "comment_count", order: "desc" },
        };
      });
    } else if (criteria === "comments-l-h") {
      setNewQuery((currentQuery) => {
        return {
          ...currentQuery,
          criteria: { sort_by: "comment_count", order: "asc" },
        };
      });
    } else if (criteria === "newest") {
      setNewQuery((currentQuery) => {
        return {
          ...currentQuery,
          criteria: { sort_by: "created_at", order: "desc" },
        };
      });
    } else if (criteria === "oldest") {
      setNewQuery((currentQuery) => {
        return {
          ...currentQuery,
          criteria: { sort_by: "created_at", order: "asc" },
        };
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newQuery);
    setQuery(newQuery);
    navigate(`/reviews/${query.category}/${query.title}`);
  };

  return (
    <div>
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
            value={newQuery.title}
            onChange={handleTitle}
            placeholder="Browse"
          />
          <select name="criteria" onChange={handleCriteria}>
            <option value="title" defaultValue>
              Alphabetical
            </option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="votes-h-l">Votes: High to Low</option>
            <option value="votes-l-h">Votes: Low to High</option>
            <option value="comments-h-l">Comments: High to Low</option>
            <option value="comments-l-h">Comments: Low to High</option>
          </select>
          <button>🔍</button>
        </form>
      )}
    </div>
  );
}
