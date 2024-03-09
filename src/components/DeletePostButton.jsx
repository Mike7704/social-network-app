"use client";
import { handlePostDelete } from "@/utils/utils";

export default function DeletePostButton({ postID }) {
  return (
    <button className="button" onClick={() => handlePostDelete(postID)}>
      Delete
    </button>
  );
}
