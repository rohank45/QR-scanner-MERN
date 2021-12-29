import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import register from "../images/register.png";

const Register = () => {
  const history = useHistory();

  const [society, setSociety] = useState("Oberoi Esquire");
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const submitUser = async (e) => {
    e.preventDefault();

    try {
      if (!mobileNumber || !name || !society || !password || !cpassword) {
        return toast.error("All fields are mandatory", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      if (!society || society === "") {
        return toast.error("Please select society", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      if (password !== cpassword) {
        return toast.error("Password and Confirm Password not matching", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      await axios.post("/register", {
        mobile_number: mobileNumber,
        name,
        society,
        password,
        cpassword,
      });

      history.push("/login");

      return toast.success("Registration Success", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
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
        <p className="mt-5">Register</p>

        <div className="w-28 py-3">
          <img src={register} alt="*" />
        </div>
      </div>

      <form
        onSubmit={submitUser}
        className="font-semibold text-xl mx-10 flex flex-col gap-5 -mt-20"
      >
        <input
          type="tel"
          placeholder="Mobile Number"
          minLength="10"
          maxLength="10"
          pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$"
          onChange={(e) => setMobileNumber(e.target.value)}
          className="py-3 px-4 rounded-lg border border-blue-700 outline-none"
        />

        <input
          type="text"
          placeholder="Name"
          minLength="2"
          maxLength="15"
          onChange={(e) => setName(e.target.value)}
          className="py-3 px-4 rounded-lg border border-blue-700 outline-none"
        />

        {/* <select
          value={society}
          onChange={(e) => setSociety(e.target.value)}
          className="py-3 px-4 rounded-lg border border-blue-700 outline-none"
        >
          <option value="Oberoi Esquire">Oberoi Esquire</option>
          <option value="Kalpataru Estate">Kalpataru Estate</option>
          <option value="Oberoi Splendor">Oberoi Splendor</option>
        </select> */}

        <label className="py-3 px-4 rounded-lg border border-blue-700 outline-none">
          Oberoi Esquire
        </label>

        <input
          type="password"
          placeholder="Password"
          minLength="8"
          maxLength="12"
          onChange={(e) => setPassword(e.target.value)}
          className="py-3 px-4 rounded-lg border border-blue-700 outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          minLength="8"
          maxLength="12"
          onChange={(e) => setCPassword(e.target.value)}
          className="py-3 px-4 rounded-lg border border-blue-700 outline-none"
        />

        <button
          type="submit"
          className="py-3 my-2 text-lg rounded-lg text-white bg-blue-color shadow-lg hover:bg-blue-800 tracking-wide"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
