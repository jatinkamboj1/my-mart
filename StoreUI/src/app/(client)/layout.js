"use client";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import Breadcrumbs from "@/components/Breadcrumbs/breadcrumbs";
import ClientOnly from "./ClientOnly";
import { useSession, signOut } from "next-auth/react";
export const dynamic = "force-dynamic";
import "@/styles/header.scss";
import "@/styles/footer.scss";
import "@/styles/breadcrumb.scss";
import "@/styles/Navbar.scss";
import { useEffect } from "react";


export default function RootLayout({ children }) {

  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status !== "loading" )
      if (status !== "authenticated" || !session || session.expires < new Date().toISOString()) {
      signOut({ callbackUrl: "/signin" });
  }
  }, [status, session]);
  return (
    <html lang="en">
      <body>
        <ClientOnly>
            <Header />
            {/* <Navbar/> */}
            <Breadcrumbs />
            {children}
            <Footer />
        </ClientOnly>
      </body>
    </html>
  );
}
