import React, { useState } from "react";
import ViewLogsEntry from "./ViewLogsEntry";
import ViewLogsExit from "./ViewLogsExit";

const ViewLogs = () => {
  const [entry, setEntry] = useState(true);
  const [isActive, setIsActive] = useState(true);

  return (
    <div>
      <div className="h-44 bg-blue-color text-white shadow-md fixed">
        <p className="text-2xl mx-10 py-4">Logs</p>

        <div className="flex gap-8 mx-6 font-semibold">
          <input
            // type="date"
            placeholder="Start Date"
            className="bg-white text-black text-xl rounded-md shadow px-4 py-3 w-1/2 outline-none"
          />

          <input
            // type="date"
            placeholder="End Date"
            className="bg-white text-black text-xl rounded-md shadow px-4 py-3 w-1/2 outline-none"
          />
        </div>

        <div className="flex justify-between mx-16 mt-5 pb-3 text-2xl">
          <button
            className={`${isActive === true ? "underline" : ""}`}
            onClick={() => {
              setEntry(true);
              setIsActive(true);
            }}
          >
            Entries
          </button>
          <button
            className={`${isActive === false ? "underline" : ""}`}
            onClick={() => {
              setEntry(false);
              setIsActive(false);
            }}
          >
            Exits
          </button>
        </div>
      </div>

      <div className="pt-44">
        {entry === true ? <ViewLogsEntry /> : <ViewLogsExit />}
      </div>
    </div>
  );
};

export default ViewLogs;
