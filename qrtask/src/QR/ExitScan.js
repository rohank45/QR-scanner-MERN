import React from "react";
import login from "../images/login.png";
import LogEntryScanHead from "../images/LogEntryScanHead.png";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import QrReader from "react-qr-reader";
import { toast } from "react-toastify";

const ExitScan = () => {
  const history = useHistory();
  const location = useLocation();
  const userData = location.state.user;

  return (
    <div>
      <div className="bg-blue-color header-shape px-8 pt-2 h-72 shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="w-10">
            <img src={LogEntryScanHead} alt="*" />
          </div>

          <p className="text-white text-2xl font-semibold tracking-wide">
            Log Exit
          </p>

          <div className="w-40 pt-5">
            <img src={login} alt="*" />
          </div>
        </div>
      </div>

      <div className="-mt-20">
        <div className="mx-10">
          <QrReader
            delay={300}
            onScan={async (res) => {
              if (res === "exit") {
                await axios.post("/exit", {
                  mobile_number: userData.mobile_number,
                  tokenId: Math.random().toString(16).slice(2),
                  user_name: userData.name,
                  society_name: userData.society,
                  exit: res,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                });

                history.push("/after/exit");
              } else {
                toast.error("Invalid QR", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                });
                window.location.reload(false);
              }
            }}
            onError={(error) => console.log(error)}
            legacyMode
          />
        </div>
      </div>
    </div>
  );
};

export default ExitScan;
