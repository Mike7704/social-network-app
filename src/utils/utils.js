"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function handlePostDelete(postID) {
  await sql`DELETE FROM Likes_SH WHERE PostID = ${postID}`;
  await sql`DELETE FROM Posts_SH WHERE PostID = ${postID}`;
  revalidatePath(`/posts`);
}

export async function handlePostLike(userID, postID) {
  await sql`INSERT INTO Likes_SH (UserID, PostID) VALUES (${userID}, ${postID});`;
  revalidatePath(`/posts`);
}

export async function checkIfUserLikedPost(userID, postID) {
  const userLikedPost = await sql`
    SELECT PostID
    FROM Likes_SH
    WHERE UserID = ${userID} AND PostID = ${postID}
  `;
  return userLikedPost.rows.length > 0;
}

export async function checkIfUsersPost(userID, postID) {
  const userPosts = await sql`
    SELECT * FROM Posts_SH WHERE UserID = ${userID} AND PostID = ${postID}
  `;
  return userPosts.rows.length > 0;
}
