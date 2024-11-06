import React, { useState, useEffect } from "react";
import Head from "./Head";
import Feed from './Feed';
import Sign from "./Sign";
import Login from "./Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchPostsFromFirestore } from './firebaseConfig';  // Import the new fetch function for Firestore
import { fetchDataFromFirestore } from "./firebaseConfig";
import { doc, getDoc} from 'firebase/firestore'; // Add Firestore functions
import { db } from './firebaseConfig';


export default function Mid(props) {

  const [logInState, setLoginState] = useState('');
  const [ifLoggedIn, setIfLoggedIn] = useState(false)
  const auth = getAuth();
  const [userObj, setUserObj] = useState('');
  const [newPost, setNewPost] = useState([]);
//
  // const [profileClick, setProfileClick] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIfLoggedIn(true)

        setUserObj(user);






      }
      else {

        setIfLoggedIn(false);
        setUserObj(null);  // Handle when user logs out
      }
    });

    return () => unsubscribe();

  }, [auth]);


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchPostsFromFirestore(); // Fetch from Firestore
        setPosts(fetchedPosts);  // Set the posts state with fetched posts
      } catch (error) {
        console.error('Error fetching posts from Firestore:', error);
      }
    };
    fetchPosts();
  }, []);

  if (posts) {
    const existingPosts = props.profilePosts;
    posts.map((post) => {
      if (post.userId === userObj?.uid) {
        existingPosts.push(post); 
      }
    })

    props.setProfilePosts(existingPosts);

  }





  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    // Fetch user data when userObj changes
    if (userObj?.uid) {
      fetchDataFromFirestore('users', userObj.uid)
        .then(data => {

          const userData = data[0];
          setUserPosts(userData?.userPosts || []);
        })
        .catch(error => console.error('Error fetching user posts:', error));
    }
  }, [userObj?.uid]);


  const [userData, setUserData] = useState(null);
  useEffect(() => {

    const fetchUserData = async () => {

      if (userObj?.uid) {

        try {
          const userDocRef = doc(db, "users", userObj.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const fetchedData = userDocSnap.data();
            setUserData(fetchedData);


          }
          else {
            console.log("no such user document");

          }

        } catch (error) {
          console.error("Error: ", error);
        }
      }


    };
    fetchUserData();

  }, [userObj?.uid]);




  return (
    <div className={`relative flex flex-col w-full`}>
      <Head
        setLoginState={setLoginState}
        ifLoggedIn={ifLoggedIn}
        setIfLoggedIn={setIfLoggedIn}
        userData={userObj}
        userId={userObj?.uid}
        userPosts={userPosts}
        setNewPost={setNewPost}
        setUserObj={setUserObj}
        userProfile={userData} ///this is for the data from firestore

      />
      <Feed
        ifLoggedIn={ifLoggedIn}
        newPost={newPost}
        posts={posts}
        userId={userObj?.uid}
        deletePost={props.deletePost}
      />
      {logInState && (logInState === 'signin' ?
        <Sign setLoginState={setLoginState} setIfLoggedIn={setIfLoggedIn} />
        :
        <Login setLoginState={setLoginState} setIfLoggedIn={setIfLoggedIn} />
      )}
    </div>
  );
}