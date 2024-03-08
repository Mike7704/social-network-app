import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import ProfileCompletedCheck from "@/components/ProfileCompletedCheck";

export default async function Posts() {
  return (
    <ProfileCompletedCheck>
      <main className="page-content-container text-center">
        <AnimateIn>
          <h2>Posts</h2>
        </AnimateIn>
      </main>
    </ProfileCompletedCheck>
  );
}
