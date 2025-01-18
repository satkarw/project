import React from "react";
import { useNavigate } from "react-router-dom";

export default function Notifications(props) {
    const navigate = useNavigate();

    return (
        <div className="h-full w-full flex flex-col items-center gap-5 justify-center">
            <div className="text-4xl flex font-bold">This page will contain Notifications</div>
            <button
                className="border px-3 py-2 text-lg rounded-md hover:bg-slate-800"
                onClick={() => navigate("/")} // Wrap navigate("/") in an arrow function
            >
                Home
            </button>
        </div>
    );
}
