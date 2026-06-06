import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import Breadcrumbs from "@/components/Breadcrumbs/breadcrumbs";
import "@/styles/header.scss";
import "@/styles/footer.scss";
import "@/styles/breadcrumb.scss";
import "@/styles/Navbar.scss";


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* <Navbar/> */}
        <Breadcrumbs />
        {children}
        <Footer />
      </body>
    </html>
  );
}
