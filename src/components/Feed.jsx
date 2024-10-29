import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import SkeletonLoader from "./SkeletonLoader";
import { motion } from "framer-motion";

export default function Feed(props) {
  
  const posts = props.posts;
  console.log(props.userId)

  if(posts.length<1)
{
  return(
    <SkeletonLoader/>
  )
}
  
  return (
    <>
      {props.newPost && (
        <motion.div 

        initial={{
          scale: 0.5,    // Start with a slightly larger size for a more subtle effect
          opacity: 0,
          y: -50
      }}
      animate={{
          scale: 1,
          opacity: 1,
          y: 0
      }}
      transition={{
          type: "spring",
          stiffness: 200,  // Lower for a slower transition
          damping: 15      // Higher for a more bouncy effect
      }}
        
        className="mt-4 ml-3 mr-3 border border-gray-700 p-3 rounded-lg flex flex-col gap-4 "
        >
          {/* user name and dp */}

          <div className="flex gap-2 items-center">
            <img src={logo} alt="" className="rounded-full w-10" />
            <button href="#" className="text-xl">
                <Link to={`/profile/${props.newPost.userId}`}
                                    state={{ userID:props.newPost.userId, userProfile:{}, userPosts: {}, mainUserId:props.userId} }>
                                    <strong>{props.newPost.ghostName}</strong>
                </Link>
            </button>

            <p className="text-slate-600 text-sm pt-[3px] pl-[5px]">
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(new Date(props.newPost.timestamp))}
            </p>
              
          

          </div>

          {/* text content */}
          <div className="m-3 pb-2 border-b">
            <p className="text-xl">{props.newPost.postText}</p>
          </div>

          <div>
            <p className="text-slate-600 text-sm ml-5">
              {" "}
              likes and comments -- comming soon{" "}
            </p>
          </div>
        </motion.div>
      )}

      {

        posts.map((post, index) => (
          
          <Posts

          posts={posts}
          post={post}
          index={index}
          key={post.id || `post-${index}`}
          userId={props.userId}
          deletePost = {props.deletePost}
          
          />


        ))
}
    </>
  );
}
