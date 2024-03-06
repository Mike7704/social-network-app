import { ClerkProvider } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Rubik } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weights: ["700"],
});

export const metadata = {
  title: "Social Network App",
  description: "A Next.js app that uses Clerk to create user profiles",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={rubik.className} suppressHydrationWarning={true}>
          <div className="background-overlay" />
          <UserButton />
          <Header />
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
