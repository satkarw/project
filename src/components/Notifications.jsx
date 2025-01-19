import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Notifications() {
    const navigate = useNavigate();

    // Retrieve notification data and loading state from Redux
    const notificationData = useSelector((state) => state.auth.notificationData || []);
    const loading = useSelector((state) => state.auth.notificationData === undefined);

    // Handle notification click
    function notificationClick() {
        alert("Under Development");
    }

    // Render the loader or the notification data
    return (
        <div className="h-full w-full flex flex-col gap-5 px-10">
            {loading ? (
                <div className="text-4xl font-bold">Loading...</div>
            ) : (
                <>
                    <div className="flex justify-between">
                        <p className="text-3xl font-semibold">Notifications</p>
                        <button
                            className="border px-2 py-1 rounded-md"
                            onClick={() => navigate("/")}
                        >
                            Home
                        </button>
                    </div>

                    <div className="flex flex-col gap-3" onClick={notificationClick}>
                        {notificationData?.length > 0 ? (
                            notificationData.map((notification, index) => (
                                <button key={index} className="border p-3 rounded">
                                    {notification.type === "post_like" ? (
                                        <span>
                                            <strong>{notification.likedByUserName}</strong> liked your post.
                                        </span>
                                    ) : (
                                        <span>Notification type not handled.</span>
                                    )}
                                </button>
                            ))
                        ) : (
                            <div>No notifications found.</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
