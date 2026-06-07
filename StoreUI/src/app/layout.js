import { getServerSession } from "next-auth";
import Providers from "@/utils/Providers";
import SessionProvider from "@/utils/SessionProvider";
import { ReactQueryClientProvider } from "@/utils/providers/ReactQueryProvider";
import Script from "next/script";
import "./globals.css";
import "@/styles/bootstrap.css";
import "@/styles/pe-icon-7-stroke.css";
import "@/styles/font-awesome.css";
import "@/styles/global.scss";

const cardImage = "/logo2.jpg";
const public_url = process.env.NEXT_PUBLIC_UR;

export async function generateMetadata({ params }) {
  const currentUrl = `${public_url}${params?.path ? `/${params.path}` : ''}`;
  return {
    title: "Wedding Touch | Premium Fashion Jewellery",
    description:
      "Wedding Touch is a trusted destination for fashion jewellery and daily wear, delivering quality products that enhance your style.",
    keywords:
      "Wedding Touch, fashion jewellery, necklaces, earrings, wedding store, silver, occasional wear",
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: "Wedding Touch | Premium Fashion Jewellery",
      description:
        "Discover trusted fashion jewellery and accessories at Wedding Touch. Quality products designed for elegant living.",
      url: currentUrl,
      images: [
        {
          url: cardImage,
          width: 1200,
          height: 630,
          alt: "Wedding Touch – Premium Fashion Jewellery",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Wedding Touch | Premium Fashion Jewellery",
      description:
        "Your trusted destination for premium fashion jewellery. Elegant living made easy with Wedding Touch.",
      images: [cardImage],
    },
    alternates: {
      canonical: currentUrl,
    },
    authors: [{ name: "Wedding Touch" }],
    charset: "UTF-8",
  };
}

export default async function RootLayout({ children }) {
  // Fetch session data on the server side
  const session = await getServerSession();

  // Extract the session data as a plain object
  const sessionData = session ? { user: session.user } : null;
  return (
    <html lang="en">
      <body >
        <ReactQueryClientProvider>
          <SessionProvider session={sessionData}>
            <Providers>
              {children}
            </Providers>
          </SessionProvider>
        </ReactQueryClientProvider>
        <Script
  src="https://checkout.razorpay.com/v1/checkout.js"
  strategy="afterInteractive"
/>
      </body>
    </html>
  );
}
