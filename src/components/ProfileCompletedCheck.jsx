import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ProfileCompletedCheck({ children }) {
  const user = await currentUser();

  // Check user has completed setting up their profile
  if (user && !user.privateMetadata.profileCompleted) {
    redirect(`/sign-in`);
  }

  return <>{children}</>;
}
