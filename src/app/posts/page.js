import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import ProfileCompletedCheck from "@/components/ProfileCompletedCheck";

export default async function Posts() {
  return (
    <ProfileCompletedCheck>
      <AnimateIn>
        <main className="page-content-container">
          <h2>Posts</h2>
        </main>
      </AnimateIn>
    </ProfileCompletedCheck>
  );
}
