import React from "react";
import { Link } from "react-router-dom";

const ViewLogs = () => {
  return (
    <div className="bg-gray-50 h-screen">
      <div className="h-44 bg-blue-color text-white shadow-md">
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

        <div className="flex justify-between mx-16 mt-5 text-2xl">
          <Link to="/">Entries</Link>
          <Link to="/">Exits</Link>
        </div>
      </div>

      <div className="h-12 px-2 py-5 flex flex-col text-md font-semibold capitalize tracking-wide">
        <div className="flex justify-between items-center rounded-md p-2 my-2 shadow-xl border bg-white">
          <div>
            <p>mr rohan</p>
            <p>Oberoi Society</p>
          </div>

          <p className="text-gray-500">12.30pm</p>
        </div>
      </div>
    </div>
  );
};

export default ViewLogs;
