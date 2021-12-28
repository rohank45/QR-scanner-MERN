import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import login from "../images/login.png";

const Login = () => {
  const history = useHistory();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  function generate(n) {
    var add = 1,
      max = 12 - add;
    if (n > max) {
      return generate(max) + generate(n - max);
    }
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return ("" + number).substring(add);
  }

  const LoginUser = async (e) => {
    e.preventDefault();

    try {
      if (!mobileNumber || !password) {
        return toast.error("All fields are mandatory", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      await axios.post("/login", {
        mobile_number: mobileNumber,
        password,
      });

      await axios.post("/send/otp", {
        otp: generate(6),
        mobile_number: mobileNumber,
      });

      toast.success("OTP sended please check sms", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });

      history.push({
        pathname: "/verify",
        state: { mobile_number: mobileNumber },
      });
    } catch (error) {
      return toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className="bg-blue-color header-shape px-12 pt-5 h-72 flex justify-between text-white text-3xl tracking-wide shadow-2xl">
        <div>
          <p>Simplify</p>
          <p>Entry</p>
        </div>

        <div className="w-40 py-3">
          <img src={login} alt="*" />
        </div>
      </div>

      <form
        onSubmit={LoginUser}
        className="font-semibold text-xl mx-10 flex flex-col gap-5 -mt-20"
      >
        <input
          type="tel"
          placeholder="Mobile Number"
          minLength="10"
          maxLength="10"
          pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$"
          onChange={(e) => setMobileNumber(e.target.value)}
          className="py-3 px-4 rounded-lg border border-blue-600 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          minLength="8"
          maxLength="12"
          onChange={(e) => setPassword(e.target.value)}
          className="py-3 px-4 rounded-lg border border-blue-600 outline-none"
        />

        <button
          type="submit"
          className="py-3 my-2 text-lg rounded-lg text-white bg-blue-color shadow-lg hover:bg-blue-800"
        >
          Login
        </button>
      </form>

      <p className="text-blue-color mx-5 text-lg my-20">
        Designed and developed by SimplifyTech.in
      </p>
    </div>
  );
};

export default Login;
