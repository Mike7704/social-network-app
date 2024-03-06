import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="nav-bar-container">
      <Link className="button" href="/">
        Home
      </Link>
      <Link className="button" href="/games?category=All">
        Posts
      </Link>
      <Link className="button" href="/addGame">
        About
      </Link>
    </nav>
  );
}
