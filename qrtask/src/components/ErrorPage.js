import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Link to="/">
      <div
        className="text-3xl font-semibold h-screen bg-gradient-to-r from-blue-800 to-blue-700
          text-white text-center tracking-wide py-40 px-10"
      >
        click anywhere to go back to Home page!
      </div>
    </Link>
  );
};

export default ErrorPage;
