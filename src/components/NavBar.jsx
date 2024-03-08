import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="nav-bar-container">
      <Link className="button" href="/">
        Home
      </Link>
      <Link className="button" href="/posts">
        Posts
      </Link>
      <Link className="button" href="/profile">
        Profile
      </Link>
    </nav>
  );
}
