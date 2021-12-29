import React from "react";
import { Link } from "react-router-dom";
import bgHome from "../images/home.png";
import Cookies from "universal-cookie";

const Home = () => {
  const cookies = new Cookies();

  return (
    <div className="overflow-hidden h-screen">
      {cookies.get("userLogin") ? (
        <Link to="/mainpage">
          <div className="flex flex-col z-50 absolute top-44 left-6 text-6xl text-white font-semibold">
            <p>Simplify</p>
            <p>Entry</p>
          </div>

          <div className="scale-img pl-28 pt-24 bg-blue-color">
            <img src={bgHome} alt="home" />
          </div>
        </Link>
      ) : (
        <Link to="/auth">
          <div className="flex flex-col z-50 absolute top-44 left-6 text-6xl text-white">
            <p>Simplify</p>
            <p>Entry</p>
          </div>

          <div className="scale-img pl-28 pt-24 bg-blue-color">
            <img src={bgHome} alt="home" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Home;
