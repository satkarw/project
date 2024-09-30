import React from "react";
import logo from "../../public/logo.png";
import { doc, getDoc } from 'firebase/firestore';
import { saveDataToFirestore, savePostToRealtimeDatabase } from './firebaseConfig';
import { db } from './firebaseConfig'; // Import Firestore instance
import Logout from "./Logout";
import { Link } from "react-router-dom";

export default function Head(props) {

    function isLoggedIn() {
        return props.ifLoggedIn;
    }

    function handelLogin() {
        props.setLoginState('login');
    }

    function handelSignin() {
        props.setLoginState('signin');
    }

    // Handle post submission without logging in
    function handleNotLoggedInPostClick() {
        const loginFirstText = document.getElementById('loginFirstText');
        loginFirstText.classList.remove('hidden');
        setTimeout(() => {
            loginFirstText.classList.add('hidden');
        }, 2000);
    }

    // Handle posting when logged in
    async function handlePost() {
        const postText = document.getElementById('textInput').value.replace(/\r\n/g, '\n');
        const userId = props.userData.uid;

        if (postText.trim() !== '') {
            try {
                const docRef = doc(db, 'users', userId);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    const existingPosts = userData.userPosts || [];
                    const ghostName = userData.ghostName;
                    const postId = `${userId}${existingPosts.length + 1}`;

                    const postData = {
                        postId: postId,
                        postText: postText.replace(/\r\n/g, '\n'),
                        ghostName: ghostName,
                        userId: userId,
                        timestamp: Date.now(),
                    };

                    // Append new post to existing posts
                    const updatedPosts = [...existingPosts, postData];

                    // Save updated posts to Firestore
                    await saveDataToFirestore('users', { userPosts: updatedPosts }, userId);

                    // Clear textarea
                    document.getElementById('textInput').value = '';

                    // Save to Realtime Database
                    await savePostToRealtimeDatabase(postData);
                    console.log('Post saved to Realtime Database');
                    props.setNewPost(postData);

                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        } else {
            alert('Please enter some text before posting.');
        }
    }

    


    return (
        <div>
            {/* Header */}
            <div className="flex justify-center items-center border-b border-gray-700 pb-5 ml-5">
                <a href="#">
                    <img src={logo} alt="Logo" className="w-10 pr-3 rounded-lg" />
                </a>
                <a href="#" className="text-xl hover hover:underline">Your Feed</a>
                <div className="ml-auto mr-2">
                    {isLoggedIn() ? (
                        <div className="flex gap-2">

                {/* ------------------------Profile Button---------------------------------------------------------- */}

                        
                            <button className="border px-3 rounded-md hover:bg-slate-800 " >
                               <Link to="/profile">Profile</Link>
                            </button>



                            <Logout 
                                setIfLoggedIn={props.setIfLoggedIn} 
                                setUserObj={props.setUserObj} 
                            />
                        </div>
                    ) : (
                        <div className="flex gap-5">
                            <button className="border px-2 rounded-md hover:bg-slate-800" onClick={handelLogin}>
                                Log-in
                            </button>
                            <button className="border px-2 rounded-md hover:bg-slate-800" onClick={handelSignin}>
                                Sign-up
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Post Box */}
            <div className="border-b border-gray-700 py-5 ml-7">
                <div className="flex gap-6">
                    <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                    <textarea 
                        type="text" 
                        id="textInput"
                        className="bg-transparent h-fit w-full p-1 pl-2 resize-none whitespace-pre"
                        placeholder="Write your Ghost Status"
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />
                    <div className="flex flex-col gap-2">
                        {isLoggedIn() ? (
                            <button 
                                className="bg-slate-900 hover:bg-slate-700 text-white px-5 h-fit py-3 border rounded-lg mr-2"
                                onClick={handlePost}
                            >
                                Post
                            </button>
                        ) : (
                            <button 
                                className="bg-slate-900 hover:bg-slate-700 text-white px-5 h-fit py-3 border active:bg-red-800 active:border-red-900 rounded-lg mr-2"
                                onClick={handleNotLoggedInPostClick}
                            >
                                Post
                            </button>
                        )}
                        <p className="text-red-500 hidden" id='loginFirstText'>login first</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
