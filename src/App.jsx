import React from 'react';
import {BrowserRouter as  Router,Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Left from './components/Left';
import Mid from './components/Mid';
import Profile from './components/Profile';


function App() {

  // const [profileClick, setProfileClick] = useState(false);
  const deletePost = (postId,userId) =>{
    console.log("the post is deleted : ", postId," ",userId);
  }

  const [profilePosts,setProfilePosts]=useState([null]);



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
                setProfilePosts={setProfilePosts} 
                profilePosts={profilePosts} 
              deletePost={deletePost}
            
              />} />

              <Route path="/profile/:userId" element={<Profile 
              deletePost={deletePost}
              profilePosts={profilePosts}
             
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
