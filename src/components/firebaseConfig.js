import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database"; 
import { orderByChild, get } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app); 
// Setup providers for Google Authentication
export const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // This contains the user ID and other user information
  } catch (error) {
    console.error("Error signing up with email and password:", error);
  }
};

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user; // This contains the user ID and other user information
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

// Database functions
export const saveDataToFirestore = async (collectionName, data, userId) => {
  try {
    const docRef = doc(db, collectionName, userId); // Reference to the document using userId as the ID
    await setDoc(docRef, data, { merge: true }); // Save the document with the given userId as the document ID and merge with existing data
    console.log("Document written with ID: ", userId);
    return userId;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const fetchDataFromFirestore = async (collectionName, userId) => {
  try {
    const q = query(collection(db, collectionName), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

// Saving to Realtime Database 
export const savePostToRealtimeDatabase = async (postData) => {
  try {
    const postRef = ref(database, `posts/${postData.postId}`);  // Create a reference for the post using its ID
    await set(postRef, postData);  // Save the post data at the specified reference
    console.log("Post saved to Realtime Database");
  } catch (error) {
    console.error("Error saving post to Realtime Database:", error);
  }
};

export const fetchPostsFromRealtimeDatabase = async () => {
  try {
    const db = getDatabase();
    const postsRef = ref(db, 'posts'); // Reference to the 'posts' folder
    const postsQuery = query(postsRef, orderByChild('timestamp')); // Query to order by timestamp
    const snapshot = await get(postsQuery);

    if (snapshot.exists()) {
      const posts = snapshot.val(); // Returns an object containing all posts
      return Object.values(posts).reverse(); // Reverse the array to have newest first
    } else {
      console.log('No data available');
      return [];
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
