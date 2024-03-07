"use client";

export default function GlobalError({ error, reset }) {
  return (
    <main className="page-content-container">
      <h2>Error! Something went wrong...</h2>
      <p className="pb-5">{error.message}</p>
      <button className="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
