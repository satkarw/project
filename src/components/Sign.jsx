import React from 'react';
import { signInWithGoogle, saveDataToFirestore } from './firebaseConfig';
//saveDataToFirestore saves object of users information like unique id after signup

export default function Sign(props){

    async function handleGoogleSignUp() {

        const ghost=document.getElementById('ghostName').value;

        if (ghost){

        try{
           
            

                const user = await signInWithGoogle(); 
            //waiting for the functioon to run

           
                
            
            if (user) {
                console.log('user signed up;',user);

                //saving data to firestore
                const userData ={
                    userId:user.uid,
                    name:user.displayName,
                    email: user.email,
                    ghostName:ghost,
                    userPosts:[]
                };

                await saveDataToFirestore('users', userData, user.uid);
                props.setIfLoggedIn(true)
                props.setLoginState('');

            }
      
            }
            
        catch(error){
            console.error('error signing up with google',error);
            alert('error signing up')
        }
    }

    else {
        document.getElementById('ghostName').classList.add('border-red-900');
    }

        
    }


     function handleCross(){
        props.setLoginState('');
    }
    
    return (
        
        <>
        <div className=" absolute z-50  flex flex-col 
        gap-5 justify-center items-center bg-slate-900 w-[350px] h-[450px] 
        right-[12%] md:right-[27%] top-[50px]
        rounded-3xl "> 
            <h1>Sign-Up</h1>

        <input type="text" id='ghostName' placeholder="Enter your Ghost-Name" className="bg-transparent border w-[210px] h-[50px] p-5 rounded-lg " />

        <button onClick={handleGoogleSignUp} className="border  px-5 py-2 rounded-lg bg-slate-700">Sign-up with google</button>
        <button onClick={handleCross} className="border px-5 py-2 rounded-lg bg-red-700">
                    X
                </button>
        </div> 
        
        </>
    )
}
