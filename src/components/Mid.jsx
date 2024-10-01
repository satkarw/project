import React, {useState,useEffect, useCallback} from "react";

import Head from "./Head";
import Feed from './Feed'
import Sign from "./Sign";
import Login from "./Login";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchDataFromFirestore } from './firebaseConfig';
import Profile from "./Profile";
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import Firestore instance





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
        setUserObj(null);  // Handle when user logs out
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


  const [userData, setUserData]=useState(null);
  useEffect(()=>{

    const fetchUserData = async () => {

        if (userObj?.uid){

            try {
                const userDocRef = doc(db, "users", userObj.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()){
                  const fetchedData = userDocSnap.data();
                    setUserData(fetchedData);
                    

                }
                else {
                    console.log("no such user document");
                   
                }

            } catch(error){
                console.error("Error: ",  error);
            }
        }
        

    };
fetchUserData();

  }, [userObj?.uid] );


  // function handelProfileClick(){

    
  //   props.setProfileClick(!props.profileClick);
  //   console.log(props.profileClick);
  
  // }



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
        userProfile={userData} ///this is for the data from firestore

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