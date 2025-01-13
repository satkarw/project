import React from "react";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import SkeletonLoader from "./SkeletonLoader";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";

export default function Feed(props) {
  const posts = props.posts;

  if (posts.length < 1) {
    return <SkeletonLoader />;
  }

  return (
    <AnimatePresence>
      <motion.div
        layout
        layoutScroll
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="feed-container"
      >
        {props.newPost.length>0 && (
          props.newPost.map((post,index)=>(
            <motion.div
            layout
            initial={{ scale: 0.5, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15}}
            className="mt-4 ml-3 mr-3 border border-gray-700 p-3 rounded-lg flex flex-col gap-4"
            key={post.postId}
          >
            {/* New post details */}
            <div className="flex gap-2 items-center">
              <img src={logo} alt="" className="rounded-full w-10" />
              <button className="text-xl">
                <Link
                  to={`/profile/${post.userId}`}
                  state={{
                    userID: post.userId,
                    userProfile: {},
                    userPosts: {},
                    mainUserId: props.userId,
                  }}
                >
                  <strong>{post.ghostName}</strong>
                </Link>
              </button>
              <p className="text-slate-600 text-sm pt-[3px] pl-[5px]">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }).format(new Date(post.timestamp))}
              </p>
            </div>
            <div className="m-3 pb-2 border-b">
              <p className="text-xl">{post.postText}</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm ml-5">
                Refresh to like the post..
              </p>
            </div>
          </motion.div>
          ))
        )}

        <LayoutGroup>
          <motion.div layout >
            {posts.map((post, index) => 
             (
             <Posts
                key={post.id || `post-${index}`}
                posts={posts}
                post={post}
                index={index}
                userId={props.userId}
                deletePost={props.deletePost}
                likedPosts={props.likedPosts||[]}
                setLikedPosts ={props.setLikedPosts}
              />)
            )}
          </motion.div>
        </LayoutGroup>
      </motion.div>
    </AnimatePresence>
  );
}
