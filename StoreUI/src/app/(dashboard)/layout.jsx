// src/app/(dashboard)/layout.jsx
"use client";

import SideNav from "@/components/admin/SideNav/sidenav";
import ClientOnly from "./ClientOnly";
import "@/styles/bootstrap.ltr.css";
import "./global.css";
export const dynamic = "force-dynamic";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" )
    if (status !== "authenticated" || !session || session.expires < new Date().toISOString() || session.user.role !== "ADMIN") {
      signOut({ callbackUrl: "/signin" });
    }
  }, [status, session]);
  return (
    <ClientOnly>
      <main className="sa-app sa-app--desktop-sidebar-shown sa-app--mobile-sidebar-hidden sa-app--toolbar-fixed">
        <SideNav />
        <div className="sa-app__content">
          <div className="sa-app__body px-2 px-lg-4">
            {children}
          </div>
        </div>
      </main>
    </ClientOnly>
  );
}
