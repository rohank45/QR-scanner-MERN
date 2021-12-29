import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import verify from "../images/verify.png";

const Verification = () => {
  const history = useHistory();
  const location = useLocation();
  const [getOtp, setGetOtp] = useState("");

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

  const resendOtp = async () => {
    try {
      await axios.post("/send/otp", {
        otp: generate(6),
        mobile_number: location.state.mobile_number,
      });

      toast.success("OTP resended please check sms", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      return toast.error("server error try later", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      if (!getOtp) {
        return toast.error("please provide OTP code", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      await axios.post("/verify/otp", {
        otp: getOtp,
        mobile_number: location.state.mobile_number,
      });

      history.push("/mainpage");
    } catch (error) {
      return toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className="bg-blue-color header-shape px-12 pt-5 h-72 flex justify-between text-white text-3xl shadow-2xl">
        <div>
          <p>Mobile</p>
          <p>Verification</p>
        </div>

        <div className="w-24 py-3">
          <img src={verify} alt="*" />
        </div>
      </div>

      <form
        onSubmit={verifyOtp}
        className="font-semibold text-xl mx-10 flex flex-col gap-5 -mt-20"
      >
        <p className="text-blue-600 text-base tracking-normal">
          You will have received an OTP on your registered number
        </p>

        <input
          type="tel"
          placeholder="Verification code"
          minLength="6"
          maxLength="6"
          pattern="[^' ']+"
          onChange={(e) => setGetOtp(e.target.value)}
          className="py-3 px-4 rounded-lg border border-blue-600 outline-none"
        />

        <div>
          <label
            onClick={resendOtp}
            className="text-blue-600 text-lg float-right tracking-tight font-medium opacity-95 -mt-5 mr-3"
          >
            Resend OTP
          </label>

          <button
            type="submit"
            className="py-3 w-full my-3 text-lg rounded-lg text-white bg-blue-color shadow-lg hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verification;
