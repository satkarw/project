import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { setIfLoggedIn,setUserObj } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const dispatch = useDispatch();
    const auth = getAuth();
    const navigate = useNavigate()
    // Handle Logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(setIfLoggedIn(false))// Update logged-in state
            dispatch(setUserObj(null)); // Clear user data
            console.log("User logged out successfully.");
            navigate("/")
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <button 
            className="border px-2 rounded-md hover:bg-slate-800"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
