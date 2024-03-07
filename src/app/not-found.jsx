import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-content-container">
      <h2>404 - Not Found</h2>
      <p className="pb-5">Could not find the requested post.</p>
      <Link className="button" href="/">
        Return to the home page
      </Link>
    </main>
  );
}
