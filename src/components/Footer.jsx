import React from "react";
import SocialNetworks from "./SocialNetworks";

const footer = () => {
  return (
    <>
    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#111827" fill-opacity="1" d="M0,64L120,80C240,96,480,128,720,149.3C960,171,1200,181,1320,186.7L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
      <footer className="h-20 flex justify-evenly items-center bg-[#dbd9fbdb]">
        <p>@2024 - <a href="https://github.com/LudwingValecillos">Homebanking</a> <a href="https://github.com/LudwingValecillos">Ludwing Valecillos</a> </p>

        <SocialNetworks />
      </footer>
    </>
  );
};

export default footer;
