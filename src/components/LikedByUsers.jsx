import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // Import useNavigate and useLocation
import { fetchUserName } from "./firebaseConfig";


export default function LikedByUsers(props) {

  let likedBy = props.likedBy;
  const navigate = useNavigate();  // Initialize useNavigate hook
  const location = useLocation();  // Initialize useLocation hook to get current route

  // To track the current user ID from the URL
  const urlId = location.pathname.split("/")[2];

  const [likedByUsers, setLikedByUsers] = useState([]);

  // Fetch users when likedBy changes
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await Promise.all(
        likedBy.map(async (userId) => {
          const user = await fetchUserName(userId);
          return { userName: user.userName, userId }; // Return both userName and userId
        })
      );
      setLikedByUsers(users);
    };

    fetchUsers();
  }, [likedBy]);

  // Close the box when clicked
  function removeTheBox() {
    props.setRenderLiked(false);
  }

  // Check if we're already on the profile page
  const isOnProfilePage = location.pathname.startsWith("/profile/");

  // Navigate to the user profile when a user is clicked
  const handleUserClick = (userId) => {
    if (userId) {
      // If we're already on the profile page and it's the same user, navigate again to force a refresh
      if (location.pathname !== `/profile/${userId}`) {
        navigate(`/profile/${userId}`, {
          state: {
            userID: userId,
            userProfile: {},  // Optionally pass user profile data
            userPosts: {},
            mainUserId: props.mainUserId,
          },
        });
      } else {
        // Force re-render of the profile page by navigating again
        navigate(`/profile/${userId}`, { replace: true });  // replace avoids history duplication
      }
    }
  };

  // Track when the profile changes (URL change)
  useEffect(() => {
    if (urlId) {
      console.log("User ID has changed to:", urlId);
      // Trigger any action you need here, such as refetching data based on new user ID
    }
  }, [urlId]);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="backdrop-blur-lg bg-white bg-opacity-20 p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        {/* Close Button */}
        <button
          onClick={removeTheBox}
          className="absolute top-2 right-2 text-white font-bold text-4xl"
        >
          &times;
        </button>

        <div className="text-white font-semibold text-lg mb-4">Liked by</div>
        <div className="flex flex-col gap-2">
          {likedByUsers.map((user, index) => (
            <button
              key={index}
              onClick={() => handleUserClick(user.userId)}  // Call handleUserClick on user click
              className="text-white hover:bg-slate-700 rounded-md p-2 transition-all"
            >
              {user.userName}  {/* Display the user name */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
