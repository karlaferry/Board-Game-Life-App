import React from "react";
import SearchBox from "../SearchBox";
import Header from "../Header";

export default function Home() {
  // Call API: Fetch top 5 reviews
  // Store in state - [topReviews, setTopReviews]
  return (
    <div>
      <Header />
      <p>Main Here</p>
      <SearchBox />
      <p>Top Voted Reviews Here</p>
      {/* Display top 5 reviews */}
    </div>
  );
}
