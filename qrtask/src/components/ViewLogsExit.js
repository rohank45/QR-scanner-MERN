import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ViewLogsExit = () => {
  const location = useLocation();
  const [userData, setUserData] = useState([]);

  useEffect(() => setUserData(location.state.user.log), []);

  return (
    <div className="bg-gray-50 h-screen text-black">
      {userData?.map((val, id) => {
        const { user_name, society_name, time } = val;

        return val.entry === "exit" ? (
          <div
            key={id}
            className="h-12 px-2 py-5 flex flex-col text-md mb-7 font-semibold capitalize tracking-wide"
          >
            <div className="flex justify-between items-center rounded-md p-2 shadow-xl border bg-white">
              <div>
                <p>Mr {user_name}</p>
                <p>{society_name}</p>
              </div>

              <p className="text-gray-500">{time}</p>
            </div>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default ViewLogsExit;
