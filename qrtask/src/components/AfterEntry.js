import React from "react";

const AfterEntry = () => {
  return (
    <div className="font-bold h-screen bg-blue-800 text-white text-center tracking-wide flex flex-col">
      <div className="flex justify-center items-center">
        <span className="bg-sun rounded-full w-20 h-20 opacity-40 mt-32"></span>
      </div>

      <p className="text-4xl mx-12 pt-40 text-left flex flex-col gap-1">
        <span>Warm welcome</span>
        <span>to Oberoi Esquire</span>
      </p>

      <button className="py-3 font-bold mx-16 my-20 text-lg rounded-lg text-white okay-btn-bg-color shadow-2xl">
        OKAY
      </button>
    </div>
  );
};

export default AfterEntry;
