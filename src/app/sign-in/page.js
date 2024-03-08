import { clerkClient } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AnimateIn from "@/components/AnimateIn";
import FormSubmitButton from "@/components/FormSubmitButton";
import formStyles from "@/styles/form.module.css";

async function setProfileCompleted(userID) {
  await clerkClient.users.updateUserMetadata(userID, {
    privateMetadata: {
      profileCompleted: "true",
    },
  });
}

export default async function SignIn() {
  const user = await currentUser();

  // Check user is logged in
  if (!user) {
    throw new error("User is not logged in.");
  }

  // Check if user already has an account
  const checkUserExists = (await sql`SELECT UserID FROM Users_SH WHERE UserID = ${user.id}`).rows[0];
  if (checkUserExists) {
    // Make sure the meta data is set
    if (!user.privateMetadata.profileCompleted) {
      setProfileCompleted(user.id);
    }
    // Redirect user to the home page
    redirect(`/`);
  }

  // Store new user data
  async function handleNewUser(formData) {
    // Make sure this is running on the server
    "use server";

    // Get user profile data from form
    const location = formData.get("location");
    const biography = formData.get("biography");

    // Insert new user
    await sql`INSERT INTO Users_SH (UserID, Username, Biography, Location)
      VALUES
      (${user.id}, ${user.username}, ${biography}, ${location})
    `;

    // Set clerk account meta data to show account setup is completed
    setProfileCompleted(user.id);

    // Revalidate the profile page to fetch most recent data
    revalidatePath(`/sign-in`);

    // Redirect the user to the home page
    redirect(`/`);
  }

  return (
    <main className="page-content-container text-center">
      <AnimateIn>
        <h2>Welcome to the Hub, {user?.username}</h2>
        <p>Finish setting up your profile below.</p>

        <form action={handleNewUser} className={formStyles.form_container}>
          <label className="subheading" htmlFor="location">
            Location
          </label>
          <input id="location" name="location" type="text" placeholder="Where are you located?" required />

          <label className="subheading" htmlFor="biography">
            Biography
          </label>
          <textarea id="biography" name="biography" placeholder="Tell us about yourself" required />

          <FormSubmitButton />
        </form>
      </AnimateIn>
    </main>
  );
}
