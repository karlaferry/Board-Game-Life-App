import { React, useState, useEffect } from "react";
import SearchBox from "./SearchBox";

export default function ErrorPage() {
  return (
    <div>
      <SearchBox />
      <h2>404 Error - Page Not Found</h2>
      <img src={`https://http.cat/404.jpg`} alt="error cat" width="100%" />
    </div>
  );
}

// TODO:
// Error Page
// Header + SearchBox
// Has Route
// Contains Error Component

// Error Component
// No header / SearchBox
// No Route

// API & ReviewsResults
// API: Add Limit and P
// ReviewsResults: Add buttons for Previous & Next
