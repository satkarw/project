import React from 'react';
import {BrowserRouter as  Router,Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Left from './components/Left';
import Mid from './components/Mid';
import Profile from './components/Profile';
import { getDoc,getFirestore,doc,updateDoc,arrayRemove,deleteDoc, collection, query,where,getDocs } from 'firebase/firestore';
import { db } from './components/firebaseConfig';

function App() {


  const [likedPosts,setLikedPosts]= useState([]);

async function deletePost(postId,userId){



    try {

      const postRef = collection(db,'posts');
      const q = query(postRef,where('postId','==',postId));
      const querySnapShot = await getDocs(q);

      if(!querySnapShot.empty){
        const postDoc = querySnapShot.docs[0];
        await deleteDoc(postDoc.ref);
        console.log("postDeleted");
      }
      else {
        console.log("no such posts in the postDocumnts")
      }

      const userDocRef = doc(db,"users",userId);
      const userSnapShot = await getDoc(userDocRef);

      if (userSnapShot.exists()){

        const userPosts = userSnapShot.data().userPosts || [];
        const postToDelete = userPosts.find(post => post.postId === postId);
        
        if(postToDelete){
          await updateDoc(userDocRef, {

            userPosts:arrayRemove(postToDelete)

          })

          console.log('post removed from users collection');
          
        }
        else {
          console.log("such document doesnt exist in the user collection");
        }

      
        // const updatedUserPosts = userPosts.filter(post => post.postId !== postId); 
        // console.log("updatedPosts ",updatedUserPosts)
        // await updateDoc(userDocRef , {
        //   userPosts:updatedUserPosts
        // });
        // 


      }

      else 
      {
        console.log("no such document exists in user's collection")
      }




  }

    catch(error)
    {
        console.log("error deleting the post from collectuion ",error);
    }


    try {

    }
    catch(error){

    }

  }

  // const [profilePosts,setProfilePosts]=useState([null]);



  return (



    <>
      {/* Main body */}
      
      <div className='bg-black text-white h-fit flex justify-center pt-5 '>

        <div className='

        bg-black text-white 
        h-screen grid grid-cols-[minmax(0,800px)]
         md:grid-cols-[50px_minmax(0,_800px)]
         '>
          
          <div className='hidden md:flex'>
            <Left/>
          </div>


          <div className='overflow-auto overflow-y-scroll no-scrollbar min-w-[100px] border-l border-r border-gray-700 md:pl-0 '>

            <Routes>

              <Route path='/' element={
                
                <Mid
               
              deletePost={deletePost}
              likedPosts={likedPosts}
              setLikedPosts = {setLikedPosts}
            
              />} />

              <Route path="/profile/:userId" element={<Profile 
              deletePost={deletePost}
              likedPosts={likedPosts}
              setLikedPosts = {setLikedPosts}
             
              />} />
           
              {/* <Route path="*" element={<NotFound />} /> */}
             

            </Routes>





          </div>

  
        </div>
        
      </div>
 
    </>
  );
}

export default App;
