import React from "react";
import login from "../images/login.png";
import LogEntryScanHead from "../images/LogEntryScanHead.png";

const EntryScan = () => {
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
            <img src={login} alt="*" />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">open camera</div>
    </div>
  );
};

export default EntryScan;
