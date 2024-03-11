import { currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import ProfileCompletedCheck from "@/components/ProfileCompletedCheck";
import LikePostButton from "@/components/LikePostButton";
import DeletePostButton from "@/components/DeletePostButton";
import FormSubmitButton from "@/components/FormSubmitButton";
import postStyles from "@/styles/post.module.css";

export default async function Posts() {
  const user = await currentUser();

  // Check user is logged in
  if (!user) {
    throw new error("User is not logged in.");
  }

  // Fetch all post data
  const posts = await sql`
    SELECT 
      Posts_SH.PostID,
      Posts_SH.Comment AS PostComment,
      Posts_SH.CreatedAt AS CreatedAt,
      Users_SH.UserID,
      Users_SH.Username AS Username,
      COUNT(Likes_SH.PostID) AS Likes
    FROM 
      Posts_SH
    JOIN 
      Users_SH ON Posts_SH.UserID = Users_SH.UserID
    LEFT JOIN 
      Likes_SH ON Posts_SH.PostID = Likes_SH.PostID
    GROUP BY 
      Posts_SH.PostID,
      Posts_SH.Comment,
      Posts_SH.CreatedAt,
      Users_SH.UserID,
      Users_SH.Username
    ORDER BY Posts_SH.CreatedAt ASC;
  ;`;

  // Insert new post to database
  async function handleNewPost(formData) {
    // Make sure this is running on the server
    "use server";

    // Get new post data
    const newPost = formData.get("newPost");

    // Add new post to database
    await sql`INSERT INTO Posts_SH (UserID, Comment)
      VALUES (${user.id}, ${newPost})`;

    // Revalidate the games page to fetch most recent data
    revalidatePath(`/posts`);
  }

  return (
    <ProfileCompletedCheck>
      <AnimateIn>
        <main className="page-content-container">
          <h2>Posts</h2>
          <ul className={postStyles.posts_container}>
            {posts.rows.map((post) => (
              <div className={postStyles.post_container} key={post.postid}>
                <li className={postStyles.post_content}>{post.postcomment}</li>
                <div className={postStyles.post_info}>
                  <Link className="underline" href={`/profile/${post.userid}`}>
                    Posted By: {post.username}
                  </Link>

                  <li>Date: {post.createdat.toLocaleString("en-GB")}</li>
                </div>
                <div className={postStyles.post_buttons_container}>
                  <LikePostButton userID={user.id} postID={post.postid} likeCount={post.likes} />
                  <DeletePostButton userID={user.id} postID={post.postid} />
                </div>
              </div>
            ))}
          </ul>

          <form action={handleNewPost} className={postStyles.form_container}>
            <label className="subheading" htmlFor="newPost">
              Add Post
            </label>
            <textarea id="newPost" name="newPost" placeholder="Write your post here" required></textarea>
            <FormSubmitButton />
          </form>
        </main>
      </AnimateIn>
    </ProfileCompletedCheck>
  );
}
