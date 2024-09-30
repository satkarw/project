import React, {useState,useEffect, useCallback} from "react";

import Head from "./Head";
import Feed from './Feed'
import Sign from "./Sign";
import Login from "./Login";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchDataFromFirestore } from './firebaseConfig';
import Profile from "./Profile";





export default function Mid(props){

  const [logInState,setLoginState] = useState('');
  const [ifLoggedIn, setIfLoggedIn] = useState(false)
  const auth = getAuth();
  const [userObj,setUserObj]=useState('');
  const [newPost,setNewPost]=useState('');
  // const [profileClick, setProfileClick] = useState(false);
  

  useEffect(() =>{
    const unsubscribe =   onAuthStateChanged(auth, (user) => {
      if (user) {
       setIfLoggedIn(true)
       
       setUserObj(user);
      
  
      } 
      else {

        setIfLoggedIn(false);
        setUserObj(null);  // Handle when user logs ou
      }
    });

    return () => unsubscribe();

  },[auth]);
  



  const [userPosts, setUserPosts] =useState([]); 

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




  function handelProfileClick(){

    
    props.setProfileClick(!props.profileClick);
    console.log(props.profileClick);
  
  }



  return (
    <div className={`relative flex flex-col`}>
      <Head 
        setLoginState={setLoginState}
        ifLoggedIn={ifLoggedIn}
        setIfLoggedIn={setIfLoggedIn}
        userData={userObj}
        userId={userObj?.uid}
        userPosts={userPosts}
        setNewPost={setNewPost}
        setUserObj={setUserObj}
      />
      <Feed 
        ifLoggedIn={ifLoggedIn}
        newPost={newPost}
      />
      { logInState && (logInState === 'signin' ? 
        <Sign setLoginState={setLoginState} setIfLoggedIn={setIfLoggedIn} />
        :
        <Login setLoginState={setLoginState} setIfLoggedIn={setIfLoggedIn} />
      )}
    </div>
  );
}