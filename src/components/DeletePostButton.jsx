"use client";
import { useState, useEffect } from "react";
import { handlePostDelete } from "@/utils/utils";
import { checkIfUsersPost } from "@/utils/utils";

export default function DeletePostButton({ userID, postID }) {
  const [isUsersPost, setIsUsersPost] = useState(false);

  // Display delete button if the post belongs to the user
  useEffect(() => {
    const checkUserPosts = async () => {
      const userPost = await checkIfUsersPost(userID, postID);
      setIsUsersPost(userPost);
    };
    checkUserPosts();
  }, [userID, postID]);
  return (
    <>
      {isUsersPost && (
        <button className="button" onClick={() => handlePostDelete(postID)}>
          Delete
        </button>
      )}
    </>
  );
}
