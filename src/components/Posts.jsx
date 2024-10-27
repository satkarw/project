import React from "react";
import { useState, useEffect } from "react";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function (props) {

  const [menuClick,setMenuClick]=useState(false);

  function threeDots(postId,userId){

    
    setMenuClick((prev)=>!prev);
    console.log(menuClick);

  }
   
  return (
    <>

    {

        <motion.div
            key={props.post.id || props.index}

            initial={{
              scale:0.8,
              opacity:0
            }}

            animate ={{
              scale:1,
              opacity:1
            }}
            transition ={{
              type:"spring",
              stiffness:300,
              damping:20
            }}

            className="mt-4 ml-3 mr-3 border border-gray-700 p-3 rounded-lg flex flex-col gap-4 relative"
        >
          {/* user name and dp */}

            <div className="flex gap-2 items-center">
            <img src={logo} alt="" className="rounded-full w-10" />
            <button href="#" className="text-xl">

            <Link
                to={`/profile/${props.post.userId}`}
                state={{
                    userID: props.post.userId,
                    userProfile: {},
                    userPosts: {},
                    mainUserId: props.userId,
                }}
            >
                <strong>{props.post.ghostName}</strong>
            </Link>
            </button>

            <p className="text-slate-600 text-sm pt-[3px] pl-[5px]">
                {new Intl.DateTimeFormat("en-US", 
                {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }
                ).format(new Date(props.post.timestamp))}
            </p>

            {props.post.userId === props.userId ? (
              <div className="ml-auto">
                {
                  <>
                    <button
                      className="px-2 rounded-md hover:bg-slate-700 cursor-pointer"
                      onClick={() => threeDots(props.post.postId, props.post.userId)}

                    >
                      <p className="font-extrabold ">&#8942;</p>
                    </button>

                    {/* post menu */}
                    
                    
                  {
                  
                  menuClick ? 
                  
                  <div 

                    className="
                    h-fit w-fit
                    border 
                    px-4
                    py-3
                    rounded-lg
                    absolute
                    right-2
                    
                    
                    "
                    
                    >
                      <button
                      className="px-2 rounded-md hover:bg-slate-800"
                      onClick={()=> props.deletePost(props.post.postId, props.post.userId)}
                      >Delete</button>

                    </div> : null 
}

                  </>
                }
              </div>
            ) : null}
          </div>

          {/* text content */}
          <div className="m-3 pb-2 border-b whitespace-pre-wrap">
            <p className="md:text-xl text-lg">{props.post.postText}</p>
          </div>

          <div>
            <p className="text-slate-600 text-sm ml-5">
              {" "}
              likes and comments -- comming soon{" "}
            </p>
          </div>
        </motion.div>
      // ))
      
      }
    </>
  );
}
