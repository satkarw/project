import React from 'react';
import { signInWithGoogle } from './firebaseConfig';

export default function Login(props) {
    async function handleGoogleLogin() {
        try {
            // Trigger Google login
            const user = await signInWithGoogle();
            
            if (user) {
                console.log('User logged in:', user);
                
                // Assuming props.setIfLoggedIn is used to set authentication state
                props.setIfLoggedIn(true);
                props.setLoginState(''); // Close login modal or reset state
            }
        } catch (error) {
            console.error('Error logging in with Google:', error);
            alert('Error logging in. Please try again.');
        }
    }

    function handleCross() {
        props.setLoginState(''); // Close login modal or reset state
    }

    return (
        <>
            <div className="absolute z-50  flex flex-col 
        gap-5 justify-center items-center bg-slate-900 w-[350px] h-[450px] 
        right-[12%] md:right-[27%] top-[50px]
        rounded-3xl">
                <h1>Log In</h1>
                <button onClick={handleGoogleLogin} className="border px-5 py-2 rounded-lg bg-slate-700">
                    Log-in with Google
                </button>
                <button onClick={handleCross} className="border px-5 py-2 rounded-lg bg-red-700">
                    X
                </button>
            </div>
        </>
    );
}
