import React, {useState,useEffect} from "react";

import Head from "./Head";
import Feed from './Feed'
import Sign from "./Sign";
import Login from "./Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchDataFromFirestore } from './firebaseConfig';





export default function Mid(){

  const [logInState,setLoginState] = useState('');
  const [ifLoggedIn, setIfLoggedIn] = useState(false)
  const auth = getAuth();
  const [userObj,setUserObj]=useState('');
  const [newPost,setNewPost]=useState('');
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
     setIfLoggedIn(true)
     
     setUserObj(user);
    

    } 
  });

  ////update this too, because it seems that userPost isnt taking that properly
  const [userPosts, setUserPosts] =useState([]); 

  useEffect(() => {
    // Fetch user data when userObj changes
    if (userObj?.uid) {
      fetchDataFromFirestore('users', userObj.uid)
        .then(data => {
          const userData = data[0]; // Assuming the first document in the result is the one you need
          setUserPosts(userData?.userPosts || []);
        })
        .catch(error => console.error('Error fetching user posts:', error));
    }
  }, [userObj?.uid]);
    return (
        
        <>
        <div className="relative">

        <Head 
        setLoginState={setLoginState}
         ifLoggedIn={ifLoggedIn} 
         userData={userObj}
         userId={userObj.uid}
         userPosts={userPosts}
         setNewPost={setNewPost}
        
        />
        <Feed 
        
        ifLoggedIn={ifLoggedIn}
        newPost ={newPost}
        />

        
        
        { !logInState ?null: logInState === 'signin'? <Sign setLoginState={setLoginState} setIfLoggedIn={setIfLoggedIn} />:<Login setLoginState={setLoginState} /> }

        </div>
   

        </>
    )
}