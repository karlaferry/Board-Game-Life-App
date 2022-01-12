import { createContext, useState } from "react";

export const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState({
    category: "all-categories",
    title: "all-reviews",
    criteria: { sort_by: "title", order: "asc" },
  });

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};
