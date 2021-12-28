import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mainPageSun from "../images/mainPageSun.png";
import LogExit from "../images/LogExit.png";
import LogEntry from "../images/LogEntry.png";
import Logout from "../images/Logout.png";
import viewLog from "../images/viewLog.png";
import { toast } from "react-toastify";

const MainPage = () => {
  const history = useHistory();
  const [user, setUser] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get("/profile");
      setUser(res.data);
    } catch (error) {
      history.push("/login");
      return toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const logout = async () => {
    await axios.get("/logout");

    history.push("/login");

    toast.success("Logout success", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  return (
    <div>
      <div className="bg-blue-color main-page-header-shape px-8 pt-5 h-80 flex justify-between text-white text-3xl tracking-wide shadow-2xl">
        <div>
          <p>Hello</p>
          <p>{user?.name}</p>
        </div>

        <div className="w-40 py-3">
          <img src={mainPageSun} alt="*" />
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center text-white mx-12 gap-10 fixed top-48">
        <div className="okay-btn-bg-color w-28 h-28 rounded-md shadow-2xl flex flex-col justify-center items-center gap-1">
          <img src={LogEntry} alt="a" className="w-10" />
          <p className="font-semibold">Log Entry</p>
        </div>
        <div className="okay-btn-bg-color w-28 h-28 rounded-md shadow-2xl flex flex-col justify-center items-center gap-1">
          <img src={LogExit} alt="b" className="w-10" />
          <p className="font-semibold">Log Exit</p>
        </div>
        <div className="okay-btn-bg-color w-28 h-28 rounded-md shadow-2xl flex flex-col justify-center items-center gap-1">
          <img src={viewLog} alt="c" className="w-10" />
          <p className="font-semibold">View Log</p>
        </div>
        <div
          onClick={logout}
          className="okay-btn-bg-color w-28 h-28 rounded-md shadow-2xl flex flex-col justify-center items-center gap-1"
        >
          <img src={Logout} alt="d" className="w-10" />
          <p className="font-semibold">Logout</p>
        </div>
      </div>

      <p className="text-blue-color mx-5 text-lg fixed bottom-10">
        Designed and developed by SimplifyTech.in
      </p>
    </div>
  );
};

export default MainPage;
