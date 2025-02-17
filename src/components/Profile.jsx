import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import logo from "../../public/logo.png";
import { fetchUserProfile } from "./firebaseConfig";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import SkeletonLoader from "./SkeletonLoader";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import Logout from "./Logout";
import { setIfLoggedIn,setUserObj } from "../store/authSlice";
import { useDispatch,useSelector } from "react-redux";



export default function Profile(props) {
  const dispatch = useDispatch();

  const ifLoggedIn = useSelector((state)=> state.auth.ifLoggedIn)
  const userObj = useSelector((state)=>state.auth.userObj)
  
  const location = useLocation();
  const { userId } = useParams();
  const mainUserId = location.state?.mainUserId || '';
  const [profileData, setProfileData] = useState(null);
  

  useEffect(() => {
    if (location.state ) { 
     

      if(!profileData){
        fetchUserProfile(userId).then(setProfileData);

      }
      
    } else if (userId) {
      // Fetch profile data if not available in state
      fetchUserProfile(userId).then(setProfileData);
    }
  }, [location, userId]);

  if (!profileData) return ( <SkeletonLoader/>)

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
     <AnimatePresence>

    {/* this is for when user uploads a new post */}
    
      <div className="h-[20rem] w-[100%] flex relative">
        <div></div>
        <div className="h-52  bg-slate-800 w-[100%] flex flex-col items-center justify-center gap-5"></div>

        <div className="w-fit rounded-full absolute top-[8rem] left-5 border-[0.5rem] border-slate-950">
          <img
            src={logo}
            alt=""
            className="rounded-full w-40 h-auto overflow-hidden border-4"
          />
        </div>
      </div>

      <div className="pl-6 flex place-content-between">
        <p className="text-2xl font-bold">{userProfile.ghostName}</p>

      {mainUserId == userId ?  <div className="mr-4"> <Logout /></div> : null}

      </div>

      {/* ------------------------------- Posts ---------------------*/}

      <div className=" border-b border-gray-700 mt-10 flex justify-center">
        <p className="text-xl font-bold border-b">Posts</p>
      </div>

<LayoutGroup>
  
  <motion.div
  layout
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.5, opacity: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
{  

allPosts.map((post,index)=> (
  <Posts

posts={allPosts}
post={post}
index={index}
userId={mainUserId}
deletePost = {props.deletePost}
key={post.id || `post-${index}`}
likedPosts={props.likedPosts}

/>
)



)  }
</motion.div>
</LayoutGroup>

</AnimatePresence>
    </>
  );
}
