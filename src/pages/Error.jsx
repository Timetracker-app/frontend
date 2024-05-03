import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <div>
        <h3>Ups ...</h3>
        <p>Page not found</p>
        <Link to="/" className="btn">
          Back home
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h3>Something went wrong</h3>
    </div>
  );
};

export default Error;
