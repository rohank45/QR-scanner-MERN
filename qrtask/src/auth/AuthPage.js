import React from "react";
import { Link } from "react-router-dom";
import HomeImg from "../images/authPage.png";
import authPageSUN from "../images/authPageSUN.png";

const AuthPage = () => {
  return (
    <div>
      <div className="bg-blue-color header-shape px-10 pt-5 h-72 flex justify-between text-white text-3xl tracking-wide">
        <div>
          <p>Simplify</p>
          <p>Entry</p>
        </div>

        <div className="w-40 py-3">
          <img src={authPageSUN} alt="*" />
        </div>
      </div>

      <div className="flex justify-center items-center -mt-20 mx-20">
        <img src={HomeImg} alt="logos imgs" />
      </div>

      <div className="mx-10 flex flex-col gap-5 mt-16 mb-10 text-center">
        <Link
          to="/register"
          className="py-3 text-lg rounded-lg text-white bg-blue-color shadow-md tracking-wide cursor-pointer"
        >
          Register
        </Link>

        <Link
          to="/login"
          className="py-3 text-lg rounded-lg text-white bg-blue-color shadow-md tracking-wide cursor-pointer"
        >
          Login
        </Link>
      </div>

      <p className="text-blue-color mx-5 text-lg">
        Designed and developed by SimplifyTech.in
      </p>
    </div>
  );
};

export default AuthPage;
