import React from "react";
import logo from "../../public/logo.png";
import homeIcon from "../../public/homeIcon.png";


export default function Left() {
    return (
        <div className="h-screen flex flex-col items-center"> 
            <a href="#">
                <img src={logo} alt="Logo" className="w-10  rounded-lg" />
            </a>
            <a className="flex justify-center items-center mt-4" href='#'> 
                <img src={homeIcon} alt="" className="w-7" />
                <p className="ml-2 mt-1 hidden md:inline-block text-xl">Home</p>
            </a>
        </div>
    );
}
