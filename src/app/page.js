import AnimateIn from "@/components/AnimateIn";

export default function Home() {
  //throw new Error("Error page test.");

  return (
    <main className="page-content-container text-center">
      <AnimateIn>
        <h2>Welcome to the Social Hub</h2>
        <p>Use the nav bar to browse and create posts.</p>
      </AnimateIn>
    </main>
  );
}
