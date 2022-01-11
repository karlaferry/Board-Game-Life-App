import { React, useState, useEffect } from "react";
import { fetchCategories } from "../utils/api";
import { capitaliseString } from "../utils/utilFuncs";

export default function SearchBox() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchCategories().then((res) => {
      setCategories(res);
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      <h2>Search</h2>
      {!isLoading && (
        <form>
          <select name="categories">
            <option value="All" defaultValue>
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
          <input type="text" placeholder="Browse" />
          <button>🔍</button>
        </form>
      )}
    </div>
  );
}
