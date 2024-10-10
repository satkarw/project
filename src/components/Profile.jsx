import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import logo from "../../public/logo.png";
import { fetchUserProfile } from "./firebaseConfig";
// import { doc, getDoc } from 'firebase/firestore';
// import { saveDataToFirestore, savePostToRealtimeDatabase } from './firebaseConfig';
// import { db } from './firebaseConfig'; // Import Firestore instance
// import Logout from "./Logout";
// import {fetchPostsFromRealtimeDatabase} from './firebaseConfig';
// import { fetchDataFromFirestore } from "./firebaseConfig";

export default function Profile(props) {
  
  const location = useLocation();
  const { userId } = useParams();
  const mainUserId = location.state?.mainUserId;

  console.log(mainUserId);

 
     
  const [profileData, setProfileData] = useState(null);
  

  useEffect(() => {
    if (location.state ) {
      setProfileData(location.state);

      if(!profileData){
        fetchUserProfile(userId).then(setProfileData);

      }
      
    } else if (userId) {
      // Fetch profile data if not available in state
      fetchUserProfile(userId).then(setProfileData);
    }
  }, [location, userId]);

  if (!profileData) return <div>Loading...</div>;

  const { userPosts, userProfile } = profileData;
  const userPostArray = Object.values(userPosts || {});
  const sortedPosts = userPostArray.sort((a, b) => b.timestamp - a.timestamp);

  let allPosts = [];

  if (!props.profileData) {
    allPosts = sortedPosts;
  } else {
    allPosts = props.profilePosts;
  }

  return (
    <>
      <div className="h-[20rem] w-[100%] flex relative">
        <div></div>
        <div className="h-52 bg-slate-800 w-[100%] flex flex-col items-center justify-center gap-5"></div>

        <div className="w-fit rounded-full absolute top-[8rem] left-5 border-[0.5rem] border-slate-950">
          <img
            src={logo}
            alt=""
            className="rounded-full w-40 h-auto overflow-hidden border-4"
          />
        </div>
      </div>

      <div className="pl-6">
        <p className="text-2xl font-bold">{userProfile.ghostName}</p>
      </div>

      {/* ------------------------------- Posts ---------------------*/}

      <div className=" border-b border-gray-700 mt-10 flex justify-center">
        <p className="text-xl font-bold border-b">Posts</p>
      </div>
      {allPosts.map((post, index) => (
        <div
          key={post.id || index}
          className="mt-4 ml-3 mr-3 border border-gray-700 p-3 rounded-lg flex flex-col gap-4 "
        >
          {/* user name and dp */}

          <div className="flex gap-2 items-center">
            <img src={logo} alt="" className="rounded-full w-10" />
            <a href="#" className="text-xl">
              <strong>{post.ghostName}</strong>
            </a>
            <p className="text-slate-600 text-sm pt-[3px] pl-[5px]">
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(new Date(post.timestamp))}
            </p>

            {post.userId === mainUserId ? (
              <div className="ml-auto">
                {
                  <button
                    onClick={() => props.deletePost(post.postId, post.userId)}
                    className="px-2 rounded-md hover:bg-slate-700"
                  >
                    <p className="font-extrabold ">:</p>
                  </button>
                }
              </div>
            ) : null}
          </div>

          {/* text content */}
          <div className="m-3 pb-2 border-b whitespace-pre-wrap">
            <p className="md:text-xl text-lg">{post.postText}</p>
          </div>

          <div>
            <p className="text-slate-600 text-sm ml-5">
              {" "}
              likes and comments -- comming soon{" "}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
