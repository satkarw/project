import React,{useEffect,useState} from 'react'
import {fetchPostsFromRealtimeDatabase} from './firebaseConfig';

import logo from "../../public/logo.png";



export default function Feed(props){

        const [posts, setPosts] = useState([]);
        
        
        
        useEffect(() => {
            const fetchPosts = async () => {
                const fetchedPosts = await fetchPostsFromRealtimeDatabase();
                setPosts(fetchedPosts);
            };
            fetchPosts();
        },[]);


    return (
        <>

        {props.newPost && 
        
         
        <div className="mt-4 ml-7 mr-3 border p-3 rounded-lg flex flex-col gap-4 ">

        {/* user name and dp */}

       
        <div className="flex gap-2 items-center">
            <img src={logo} alt=""  className="rounded-full w-10"/>
            <a href="#" className="text-xl"><strong>{props.newPost.ghostName}</strong></a>

        </div>


        {/* text content */}
        <div className="m-3 pb-2 border-b">
            <p className="text-xl">
           {props.newPost.postText}
            </p>
        </div>

        <div>

            <p className='text-slate-600 text-sm ml-5'> likes and comments -- comming soon </p>

        </div>
        </div>
        
        }

{

posts.map((post,index) =>

            (
                
                <div className="mt-4 ml-7 mr-3 border p-3 rounded-lg flex flex-col gap-4 ">

                {/* user name and dp */}
    
               
                <div className="flex gap-2 items-center">
                    <img src={logo} alt=""  className="rounded-full w-10"/>
                    <a href="#" className="text-xl"><strong>{post.ghostName}</strong></a>
    
                </div>
    
    
                {/* text content */}
                <div className="m-3 pb-2 border-b">
                    <p className="text-xl">
                   {post.postText}
                    </p>
                </div>

                <div>

                    <p className='text-slate-600 text-sm ml-5'> likes and comments -- comming soon </p>

                </div>
                </div>
            )
        )

        }


      
        </>
    )
}