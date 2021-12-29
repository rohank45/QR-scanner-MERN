import React, { useState } from "react";
import QRcode from "qrcode";
import login from "../images/login.png";

const GenerateQR = () => {
  const [input, setInput] = useState();
  const [qrCode, setQrCode] = useState();

  const generateQRCode = async () => {
    try {
      const res = await QRcode.toDataURL(input);
      setQrCode(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-blue-color header-shape px-8 pt-2 h-72 shadow-2xl">
        <div className="flex justify-between items-center">
          <p className="text-white text-2xl font-semibold tracking-wide">
            Generate QR
          </p>

          <div className="w-40 pt-5">
            <img src={login} alt="*" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 -mt-20 mx-10 mb-5">
        <input
          type="text"
          placeholder="society name"
          minLength="5"
          maxLength="40"
          onChange={(e) => setInput(e.target.value)}
          className="py-3 px-4 text-xl font-semibold rounded-lg border border-blue-700 outline-none"
        />

        <button
          onClick={generateQRCode}
          className="py-3 my-2 text-lg rounded-lg uppercase text-white bg-blue-color shadow-lg hover:bg-blue-800 tracking-wide"
        >
          Generate QR code
        </button>

        <div className="flex justify-center items-center">
          {qrCode ? (
            <div className="flex flex-col gap-10">
              <img src={qrCode} alt="QR-code" />

              <a
                href={qrCode}
                download
                className="bg-blue-700 text-white mx-auto p-2 rounded-md shadow-lg uppercase text-sm font-light"
              >
                download qr code
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GenerateQR;
