import React from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";
const SpamInformativo = (promps) => {
  return (
    <div className="flex flex-col flex-wrap bg-gray-900 py-9 sm:flex-row ">
      <div className="flex flex-col items-center w-1/2 text-justify text-white text">
        <h2 className="flex flex-col items-center justify-center h-20 mb-5 text-3xl text-center text-transparent font-extralight bg-gradient-to-r from-green-300 via-blue-500 to-[#57f857] bg-clip-text sm:text-5xl">
          ¡Welcome to QuantumBank!
        </h2>
        <h2 className="flex items-center justify-center h-20 mb-5 text-4xl text-center border-b-4 font-extralight">
          {promps.title}
        </h2>
        <div className="flex flex-col gap-4 px-32 text-2xl">
          <p> {promps.text1} </p>
          <p> {promps.text2} </p>
          <p> {promps.text3} </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2 ">
        <img src={promps.imgSrc} alt="" className="w-1/2 imgInformativo " />
      </div>
    </div>
  );
};

export default SpamInformativo;
