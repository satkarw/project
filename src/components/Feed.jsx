"use client"

import { useCallback } from "react"
import logo from "../../public/logo.png"
import { Link } from "react-router-dom"
import Post from "./Posts"
import SkeletonLoader from "./SkeletonLoader"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

export default function Feed(props) {
  const posts = props.posts
  const userNameObj = useSelector((state) => state.auth.ghostName)
  const userName = userNameObj ? userNameObj.userName : ""

  const deletePost = useCallback(
    (postId, userId) => {
      props.deletePost(postId, userId)
    },
    [props.deletePost],
  )

  if (posts.length < 1) {
    return <SkeletonLoader />
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key="feed-container"
        layout
        layoutScroll
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="feed-container"
      >
        {props.newPost.length > 0 &&
          props.newPost.map((post, index) => (
            <motion.div
              layout
              initial={{ scale: 0.5, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mt-4 ml-3 mr-3 border border-gray-700 p-3 rounded-lg flex flex-col gap-4"
              key={post.postId}
            >
              {/* New post details */}
              <div className="flex gap-2 items-center">
                <img src={logo || "/placeholder.svg"} alt="" className="rounded-full w-10" />
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
                <p className="text-slate-600 text-sm ml-5">Refresh to like the post..</p>
              </div>
            </motion.div>
          ))}

        {posts.map((post, index) => (
          <Post
            key={post.id || `post-${index}`}
            post={post}
            userId={props.userId}
            deletePost={deletePost}
            likedPosts={props.likedPosts || []}
            setLikedPosts={props.setLikedPosts}
            userName={userName}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

