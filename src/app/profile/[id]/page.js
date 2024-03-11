import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import ProfileCompletedCheck from "@/components/ProfileCompletedCheck";

export default async function UserProfile({ params }) {
  const userID = params.id;

  const userProfile = (await sql`SELECT * FROM Users_SH WHERE UserID = ${userID}`).rows[0];

  if (!userProfile) {
    notFound();
  }

  return (
    <ProfileCompletedCheck>
      <AnimateIn>
        <main className="page-content-container">
          <h2>User Profile</h2>
          <div className="flex flex-col gap-5">
            <p className="subheading">Username</p>
            <p className="text-center">{userProfile.username}</p>
            <p className="subheading">Location</p>
            <p className="text-center">{userProfile.location}</p>
            <p className="subheading">Biography</p>
            <p className="text-center">{userProfile.biography}</p>
          </div>
        </main>
      </AnimateIn>
    </ProfileCompletedCheck>
  );
}
