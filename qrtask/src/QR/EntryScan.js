import React, { useRef } from "react";
import QrReader from "react-qr-reader";
import { toast } from "react-toastify";
import login from "../images/login.png";
import LogEntryScanHead from "../images/LogEntryScanHead.png";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const EntryScan = () => {
  const location = useLocation();
  const userData = location.state.user;
  const history = useHistory();
  const qrCodeRef = useRef("");

  const onScanFile = () => {
    qrCodeRef.current.openImageDialog();
  };

  const onScan = async (res) => {
    if (res === "entry") {
      await axios.post("/entry", {
        mobile_number: userData.mobile_number,
        tokenId: Math.random().toString(16).slice(2),
        user_name: userData.name,
        society_name: userData.society,
        entry: res,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      history.push("/after/entry");
    } else {
      toast.error("Invalid QR", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      window.location.reload(false);
    }
  };

  return (
    <div>
      <div className="bg-blue-color header-shape px-8 pt-2 h-72 shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="w-10">
            <img src={LogEntryScanHead} alt="*" />
          </div>
          <p className="text-white text-2xl font-semibold tracking-wide">
            Log Entry
          </p>
          <div className="w-40 pt-5">
            <img src={login} alt="header" />
          </div>
        </div>
      </div>

      <div className="-mt-20">
        <div className="mx-10">
          <QrReader
            delay={300}
            onScan={onScan}
            onError={(error) => console.log(error)}
            legacyMode
          />
        </div>
      </div>

      <p className="my-10 text-lg text-center">or</p>

      <div className="flex flex-col gap-10 items-center justify-center mb-20">
        <button
          className="p-2 bg-blue-700 text-white rounded-md shadow-lg mx-16"
          onClick={onScanFile}
        >
          scan QR code
        </button>

        <div className="m-20">
          <QrReader
            ref={qrCodeRef}
            delay={300}
            onError={(error) => console.log(error)}
            legacyMode
            onScan={onScan}
          />
        </div>
      </div>
    </div>
  );
};

export default EntryScan;
