import React, {useState,useEffect, useCallback} from "react";


import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchDataFromFirestore } from './firebaseConfig';
import { Link } from "react-router-dom";

export default function Profile(props){

    return(
        <>

        <div className="h-screen w-[100%] flex ">

        <div className='h-52  bg-slate-800 w-[100%] flex flex-col items-center justify-center gap-5'>

           <h1 className="text-3xl"> Profile Page Comming Soon</h1>
            <button className="border px-3 py-2 rounded-lg hover:bg-slate-700">
                <Link to="/">HOME</Link>
                </button>
        </div>


        </div>
        
        </>
    )

}