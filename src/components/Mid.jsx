import React, { useState, useEffect } from "react";
import Head from "./Head";
import Feed from "./Feed";
import Sign from "./Sign";
import Login from "./Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchPostsFromFirestore, fetchDataFromFirestore, fetchNotificationData } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { setIfLoggedIn, setUserObj, setNotificationData } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Mid(props) {
  const dispatch = useDispatch();
  const auth = getAuth();

  // Redux state
  const ifLoggedIn = useSelector((state) => state.auth.ifLoggedIn);
  const userObj = useSelector((state) => state.auth.userObj);

  // Local state
  const [logInState, setLoginState] = useState("");
  const [newPost, setNewPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState(null);

  // Authentication listener
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setIfLoggedIn(true))
          dispatch(setUserObj(user));
          
          const userId = user.uid;
    
          async function fetchLikedPost() {
            const userDocRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(userDocRef);
            
            //fetching userLikedPosts
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              props.setLikedPosts(userData.likedPosts || []);
            } else {
              console.log("User document not found");
            }
          }
          fetchLikedPost();
        } else {
          dispatch(setIfLoggedIn(false))
          dispatch(setUserObj(null)) // Handle when user logs out
        }
      });
    
      return () => unsubscribe();
    }, [dispatch]);
    
  

  // Fetch all posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchPostsFromFirestore();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts from Firestore:", error);
      }
    };
    fetchPosts();
  }, []);

  // Fetch user-specific posts
  useEffect(() => {
    if (userObj?.uid) {
      fetchDataFromFirestore("users", userObj.uid)
        .then((data) => {
          const userData = data[0];
          setUserPosts(userData?.userPosts || []);
        })
        .catch((error) => console.error("Error fetching user posts:", error));
    }
  }, [userObj?.uid]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      if (userObj?.uid) {
        try {
          const userDocRef = doc(db, "users", userObj.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log("No such user document.");
          }
        } catch (error) {
          console.error("Error fetching user profile data:", error);
        }
      }
    };
    fetchUserData();
  }, [userObj?.uid]);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (userObj?.uid) {
        try {
          const notifications = await fetchNotificationData(userObj.uid);
          dispatch(setNotificationData(notifications));
        } catch (error) {
          console.error("Error fetching notification data:", error);
        }
      }
    };
    fetchNotifications();
  }, [userObj?.uid, dispatch]);

  return (
    <div className="relative flex flex-col w-full">
      <Head
        setLoginState={setLoginState}
        ifLoggedIn={ifLoggedIn}
        setIfLoggedIn={(state) => dispatch(setIfLoggedIn(state))}
        setUserObj={(user) => dispatch(setUserObj(user))}
        userData={userObj}
        userId={userObj?.uid}
        userPosts={userPosts}
        setNewPost={setNewPost}
        userProfile={userData}
      />
      <Feed
        ifLoggedIn={ifLoggedIn}
        newPost={newPost}
        posts={posts}
        userId={userObj?.uid}
        deletePost={props.deletePost}
        likedPosts={props.likedPosts}
        setLikedPosts={props.setLikedPosts}
      />
      {logInState && (
        logInState === "signin" ? (
          <Sign setLoginState={setLoginState} setIfLoggedIn={(state) => dispatch(setIfLoggedIn(state))} />
        ) : (
          <Login setLoginState={setLoginState} setIfLoggedIn={(state) => dispatch(setIfLoggedIn(state))} />
        )
      )}
    </div>
  );
}
