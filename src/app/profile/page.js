import { currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import AnimateIn from "@/components/AnimateIn";
import ProfileCompletedCheck from "@/components/ProfileCompletedCheck";
import FormSubmitButton from "@/components/FormSubmitButton";
import formStyles from "@/styles/form.module.css";

export default async function Profile() {
  const user = await currentUser();

  // Check user is logged in
  if (!user) {
    throw new error("User is not logged in.");
  }

  // Get user from database
  const profile = (await sql`SELECT * FROM Users_SH WHERE UserID = ${user.id}`).rows[0];

  // Store new user data
  async function handleProfileUpdate(formData) {
    // Make sure this is running on the server
    "use server";

    // Get user profile data from form
    const location = formData.get("location");
    const biography = formData.get("biography");

    // Update user profile
    await sql`
      UPDATE Users_SH 
      SET Biography = ${biography}, Location = ${location}
      WHERE UserID = ${user.id}
    `;

    // Revalidate the profile page to fetch most recent data
    revalidatePath(`/profile`);

    // Redirect the user to the profile page
    //redirect(`/profile`);
  }

  return (
    <ProfileCompletedCheck>
      <AnimateIn>
        <main className="page-content-container">
          <h2>Edit Profile</h2>
          <p>Make changes to your profile below.</p>
          <form action={handleProfileUpdate} className={formStyles.form_container}>
            <label className="subheading">Username</label>
            <p className="text-center">{profile.username}</p>

            <label className="subheading" htmlFor="location">
              Location
            </label>
            <input id="location" name="location" type="text" placeholder="Where are you located?" defaultValue={profile.location} required />

            <label className="subheading" htmlFor="biography">
              Biography
            </label>
            <textarea id="biography" name="biography" placeholder="Tell us about yourself" defaultValue={profile.biography} required />

            <FormSubmitButton />
          </form>
        </main>
      </AnimateIn>
    </ProfileCompletedCheck>
  );
}
