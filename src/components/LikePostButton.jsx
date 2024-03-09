"use client";
import { useState, useEffect } from "react";
import { checkIfUserLikedPost } from "@/utils/utils";
import { handlePostLike } from "@/utils/utils";
import Alert from "@/components/Alert";

export default function LikePostButton({ userID, postID, likeCount }) {
  const [userLikedPost, setUserLikedPost] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Display button depending on if the user has liked the post or not
  useEffect(() => {
    const fetchUserLikedPosts = async () => {
      const liked = await checkIfUserLikedPost(userID, postID);
      setUserLikedPost(liked);
    };
    fetchUserLikedPosts();
  }, [userID, postID]);

  const likePost = () => {
    setUserLikedPost(true);
    handlePostLike(userID, postID);
  };

  return (
    <>
      {userLikedPost ? (
        <button className="button" onClick={() => setShowAlert(true)}>
          👍{likeCount}✔️
        </button>
      ) : (
        <button className="button" onClick={likePost}>
          👍{likeCount}✖️
        </button>
      )}
      <Alert open={showAlert} onClose={() => setShowAlert(false)} />
    </>
  );
}
