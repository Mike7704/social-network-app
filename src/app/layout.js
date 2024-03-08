import { ClerkProvider } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Rubik } from "next/font/google";
import BackgroundOverlay from "@/components/BackgroundOverlay";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weights: ["700"],
});

export const metadata = {
  title: "Social Hub",
  description: "A Next.js app that uses Clerk to create user profiles and share posts",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={rubik.className} suppressHydrationWarning={true}>
          <BackgroundOverlay />
          <UserButton afterSignOutUrl="/" />
          <Header />
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
