import React from "react";
import { getAuth, signOut } from "firebase/auth";

export default function Logout({ setIfLoggedIn, setUserObj }) {
    const auth = getAuth();

    // Handle Logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIfLoggedIn(false); // Update logged-in state
            setUserObj(''); // Clear user data
            console.log("User logged out successfully.");
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
