"use client"

import React, { useEffect, useState, useCallback, useMemo, useRef } from "react"
import logo from "../../public/logo.png"
import liked from "../../public/liked.png"
import notLiked from "../../public/notLiked.png"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"
import LikedByUsers from "./LikedByUsers"
import { addNotifications } from "./firebaseConfig"

import SpotlightCard from "./SpotlightCard"


const Post = React.memo(function Post(props) {
  const [menuClick, setMenuClick] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [renderLiked, setRenderLiked] = useState(false)
  const [likedBy, setLikedBy] = useState([])

  const postId = props.post?.postId

  useEffect(() => {
    const fetchPostData = async () => {
      const postDocRef = doc(db, "posts", postId)
      const postDocSnapShot = await getDoc(postDocRef)

      if (postDocSnapShot.exists()) {
        const data = postDocSnapShot.data()
        const likedUsers = data.likedBy || []
        setLikedBy(likedUsers)
      }
    }

    fetchPostData()
  }, [postId])

  useEffect(() => {
    if (props.likedPosts && postId) {
      const isPostLiked = props.likedPosts.some((id) => id === postId)
      setIsLiked(isPostLiked)
    }
  }, [props.likedPosts, postId])

  const handleLiked = useCallback(
    async (postId) => {
      if (!postId || !props.userId) {
        console.error("Post ID or User ID is undefined")
        return
      }

      const wasLiked = isLiked
      setIsLiked((prev) => !prev)

      try {
        const userDocRef = doc(db, "users", props.userId)
        const postDocRef = doc(db, "posts", postId)

        if (!wasLiked) {
          setLikedBy((prev) => [...prev, props.userId])
          await updateDoc(userDocRef, {
            likedPosts: arrayUnion(postId),
          })
          await updateDoc(postDocRef, {
            likedBy: arrayUnion(props.userId),
          })

          const notificationData = {
            type: "post_like",
            postId: postId,
            likedByUserId: props.userId,
            likedByUserName: props.userName,
            userId: props.post.userId,
            timeStamp: Date.now(),
            viewed: false,
          }

          await addNotifications(props.post.userId, notificationData)
        } else {
          setLikedBy((prev) => prev.filter((id) => id !== props.userId))
          await updateDoc(userDocRef, {
            likedPosts: arrayRemove(postId),
          })
          await updateDoc(postDocRef, {
            likedBy: arrayRemove(props.userId),
          })
        }
      } catch (error) {
        console.error("Error updating likedPosts array:", error)
      }
    },
    [isLiked, props.userId, props.userName, props.post.userId],
  )

  const threeDots = useCallback(() => {
    setMenuClick((prev) => !prev)
  }, [])

  const handleDeletePost = useCallback(() => {
    props.deletePost(props.post.postId, props.post.userId)
    setIsHidden(true)
  }, [props.deletePost, props.post.postId, props.post.userId])

  const displayLikedBy = useCallback(() => {
    setRenderLiked(true)
  }, [])

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(props.post.timestamp))
  }, [props.post.timestamp])

  if (isHidden) {
    return null
  }

  return (
    <layoutGroup>
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="mt-4 ml-3 mr-3  rounded-lg flex flex-col gap-4 relative hover:border-gray-500 hover:shadow-md transition-all"
    >
      {/* User info */}
      <SpotlightCard className="mt-4 ml-3 mr-3 border border-gray-700 p-3 rounded-lg flex flex-col gap-4 relative hover:border-gray-500 hover:shadow-md transition-all">
      <div className="flex gap-2 items-center">
        <img src={logo || "/placeholder.svg"} alt="User Logo" className="rounded-full w-10" />
        <Link
          to={`profile/${props.post.userId}`}
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
        <p className="text-slate-600 text-sm pt-[3px] pl-[5px]">{formattedDate}</p>

        {/* ---------------MENU------------------------ */}
        {props.post.userId === props.userId && (
          <div className="ml-auto">
            <button className="px-2 rounded-md hover:bg-slate-700 cursor-pointer" onClick={threeDots}>
              <p className="font-extrabold">&#8942;</p>
            </button>

            <AnimatePresence>
              {menuClick && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="h-fit w-fit border px-4 py-3 rounded-lg absolute right-2 bg-slate-900"
                >
                  <button className="px-4 py-2 rounded-md hover:bg-slate-800" onClick={handleDeletePost}>
                    Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <div className="mx-3 my-0 whitespace-pre-wrap">
        <p className="md:text-xl text-lg mb-3">{props.post.postText}</p>
        <motion.div layout className="border-t pt-1 flex flex-col flex-start">
          <div className="flex flex-col w-fit items-center">
          <AnimatePresence mode="wait">
            <motion.button className="w-6" onClick={() => handleLiked(postId)}>
              <img src={isLiked ? liked : notLiked || "/placeholder.svg"} alt="" />
            </motion.button>

            <motion.button 
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-slate-600 text-sm" 
            onClick={displayLikedBy}>
              {likedBy.length > 0 && likedBy.length}
            </motion.button>
            </AnimatePresence>
            </div>
        </motion.div>
      </div>
     
      </SpotlightCard>
      
      <AnimatePresence>
        {likedBy.length > 0 && renderLiked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness:500, damping: 30 }}
            key="likedByUsers"
           className="absolute w-full "
          >
            <LikedByUsers likedBy={likedBy} setRenderLiked={setRenderLiked} mainUserId={props.userId} />
          </motion.div>
        )}
      </AnimatePresence>
     
      
    </motion.div>
    </layoutGroup>
  )
})

export default Post

