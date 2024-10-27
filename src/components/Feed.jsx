import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import SkeletonLoader from "./SkeletonLoader";

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
        <div className="mt-4 ml-3 mr-3 border border-gray-700 p-3 rounded-lg flex flex-col gap-4 ">
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
        </div>
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
