import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Left from './components/Left';
import Mid from './components/Mid';
import Profile from './components/Profile';
import { getDoc, doc, updateDoc, arrayRemove, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './components/firebaseConfig';
import Notifications from './components/Notifications';
import IndividualPost from './components/IndividualPost';

function App() {
  const [likedPosts, setLikedPosts] = useState([]);

  async function deletePost(postId, userId) {
    try {
      const postRef = collection(db, 'posts');
      const q = query(postRef, where('postId', '==', postId));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        const postDoc = querySnapShot.docs[0];
        await deleteDoc(postDoc.ref);
        console.log('Post deleted');
      } else {
        console.log('No such post found');
      }

      const userDocRef = doc(db, 'users', userId);
      const userSnapShot = await getDoc(userDocRef);

      if (userSnapShot.exists()) {
        const userPosts = userSnapShot.data().userPosts || [];
        const postToDelete = userPosts.find(post => post.postId === postId);

        if (postToDelete) {
          await updateDoc(userDocRef, { userPosts: arrayRemove(postToDelete) });
          console.log('Post removed from user collection');
        } else {
          console.log('No such document in user collection');
        }
      } else {
        console.log("No such user's document exists");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  return (
    <div className='bg-black text-white h-fit flex justify-center pt-5'>
      <div className='bg-black text-white h-screen grid grid-cols-[minmax(0,800px)] md:grid-cols-[50px_minmax(0,_800px)]'>
        <div className='hidden md:flex'>
          <Left />
        </div>
        <div className='overflow-auto overflow-y-scroll no-scrollbar min-w-[100px] border-l border-r border-gray-700 md:pl-0'>
          <Routes>
            <Route path='/' element={<Mid deletePost={deletePost} likedPosts={likedPosts} setLikedPosts={setLikedPosts} />} />
            <Route path='/profile/:userId' element={<Profile deletePost={deletePost} likedPosts={likedPosts} setLikedPosts={setLikedPosts} />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/individualPost/:postId' element={<IndividualPost />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
