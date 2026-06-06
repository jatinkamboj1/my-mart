"use client";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import Breadcrumbs from "@/components/Breadcrumbs/breadcrumbs";
import ClientOnly from "./ClientOnly";
export const dynamic = "force-dynamic";
import "@/styles/header.scss";
import "@/styles/footer.scss";
import "@/styles/breadcrumb.scss";
import "@/styles/Navbar.scss";
import "@/styles/policy.scss";


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
            <Header />
            <Breadcrumbs />
            {children}
            <Footer />
        </ClientOnly>
      </body>
    </html>
  );
}
