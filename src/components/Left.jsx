import React from "react";
import logo from "../../public/logo.png";
import homeIcon from "../../public/homeIcon.png";
import { Link } from "react-router-dom";

export default function Left(props) {
  return (
    <div className="h-screen  md:flex md:flex-col hidden items-center ">
      <a href="">
        <img src={logo} alt="Logo" className="w-10  rounded-lg" />
      </a>
      <button className="mt-4">
        <Link to="/" className="flex justify-center items-center ">
          <img src={homeIcon} alt="" className="w-7" /> 
        </Link>
      </button>
    </div>
  );
}
