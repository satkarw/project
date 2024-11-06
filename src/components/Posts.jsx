import React, { useState } from "react";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Post(props) {
  const [menuClick, setMenuClick] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  function threeDots(postId, userId) {
    setMenuClick((prev) => !prev);
  }

  function handleDeletePost(postId, userId) {
    props.deletePost(postId, userId);
    setIsHidden(true);
  }

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          layout
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mt-4 ml-3 mr-3 border border-gray-700 p-3 rounded-lg flex flex-col gap-4 relative"
        >
          {/* User info */}
          <div className="flex gap-2 items-center">
            <img src={logo} alt="User Logo" className="rounded-full w-10" />
            <Link
              to={`/profile/${props.post.userId}`}
              state={{
                userID: props.post.userId,
                userProfile: {},
                userPosts: {},
                mainUserId: props.userId,
              }}
              className="text-xl"
            >
              <strong>{props.post.ghostName}</strong>
            </Link>
            <p className="text-slate-600 text-sm pt-[3px] pl-[5px]">
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(new Date(props.post.timestamp))}
            </p>

              {/* ---------------MENU------------------------ */}
            {props.post.userId === props.userId && (
              <div className="ml-auto">
                <button
                  className="px-2 rounded-md hover:bg-slate-700 cursor-pointer"
                  onClick={() => threeDots(props.post.postId, props.post.userId)}
                >
                  <p className="font-extrabold">&#8942;</p>
                </button>
                <AnimatePresence>
                  {menuClick && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="h-fit w-fit border px-4 py-3 rounded-lg absolute right-2 bg-slate-900"
                    >
                      <button
                        className="px-4 py-2 rounded-md hover:bg-slate-800"
                        onClick={() => handleDeletePost(props.post.postId, props.post.userId)}
                      >
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          <div className="m-3 pb-2 border-b whitespace-pre-wrap">
            <p className="md:text-xl text-lg">{props.post.postText}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm ml-5">
              likes and comments -- coming soon
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
