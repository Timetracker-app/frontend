import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8 ">
        <div className="text-center">
          <p className="text-7xl font-semibold text-gray">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-3xl">
            Page not found
          </h1>
          <div className="mt-10 ">
            <Link to="/" className="btn">
              Back home
            </Link>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="grid min-h-[100vh] place-items-center px-8 ">
      <div className="text-center">
        <p className="text-7xl font-semibold text-gray">{error.status}</p>
        <h4 className="mt-4 text-3xl font-bold tracking-tight sm:text-3xl">
          Something went wrong....
        </h4>
        <div className="mt-10 ">
          <Link to="/" className="btn">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
