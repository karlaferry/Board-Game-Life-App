import { React } from "react";

export default function ErrorComponent({ err }) {
  const [code, message] = err;
  return (
    <div>
      <h2>
        {code} Error - {message}
      </h2>
      <img src={`https://http.cat/${code}.jpg`} alt="error cat" width="100%" />
    </div>
  );
}
