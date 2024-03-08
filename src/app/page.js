import AnimateIn from "@/components/AnimateIn";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="page-content-container text-center">
      <AnimateIn>
        {user ? (
          <>
            <h2>Welcome to the Hub, {user?.username}</h2>
            <p>Use the nav bar to browse and create posts.</p>
          </>
        ) : (
          <>
            <h2>Welcome to the Hub</h2>
            <p className="pb-5">Sign in or create an account using the buttons below.</p>
            <div className="flex justify-center flex-wrap gap-5">
              <SignInButton className="button" afterSignInUrl="/" afterSignUpUrl="/profile">
                Sign in
              </SignInButton>
              <SignUpButton className="button" afterSignInUrl="/" afterSignUpUrl="/profile">
                Sign up
              </SignUpButton>
            </div>
          </>
        )}
      </AnimateIn>
    </main>
  );
}
