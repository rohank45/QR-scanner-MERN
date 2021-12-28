import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/auth">
        <div className="text-5xl h-screen bg-blue-600 text-white cursor-pointer">
          <div className="bg-blue-800 home-bubble py-20 pl-5 mr-28 tracking-wide">
            <p className="pt-20 m-1">Simplify</p>
            <p className="p-2 m-1">Entry</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
