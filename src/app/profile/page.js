import AnimateIn from "@/components/AnimateIn";
import ProfileCompletedCheck from "@/components/ProfileCompletedCheck";

export default function Profile() {
  return (
    <ProfileCompletedCheck>
      <main className="page-content-container text-center">
        <AnimateIn>
          <h2>Profile</h2>
        </AnimateIn>
      </main>
    </ProfileCompletedCheck>
  );
}
