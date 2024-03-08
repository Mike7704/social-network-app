"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-content-container">
      <h2>404 - Not Found</h2>
      <p className="pb-5">Could not find the requested post.</p>
      {/* Using normal button rather than link because of this issue
      https://github.com/vercel/next.js/issues/48367 
      <Link className="button" href="/">
        Return to the home page
      </Link>
      */}
      <button className="button" onClick={() => (window.location.href = "/")}>
        Return to the home page
      </button>
    </main>
  );
}
