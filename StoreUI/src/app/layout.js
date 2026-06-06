import { getServerSession } from "next-auth";
import Providers from "@/utils/Providers";
import SessionProvider from "@/utils/SessionProvider";
import { ReactQueryClientProvider } from "@/utils/providers/ReactQueryProvider";
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
    title: "MY MART | Home Care & Daily Essentials",
    description:
      "MY MART is a trusted destination for home care and daily essentials, delivering quality products that keep homes clean, safe, and comfortable.",
    keywords:
      "MY MART, home care products, cleaning supplies, daily essentials, household products, hygiene essentials, UK home care store",
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: "MY MART | Care for Every Home",
      description:
        "Discover trusted home care and daily essentials at MY MART. Quality products designed for cleaner, healthier living.",
      url: currentUrl,
      images: [
        {
          url: cardImage,
          width: 1200,
          height: 630,
          alt: "MY MART – Home Care & Daily Essentials",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "MY MART | Care for Every Home",
      description:
        "Your trusted destination for home care and daily essentials. Clean living made easy with MY MART.",
      images: [cardImage],
    },
    alternates: {
      canonical: currentUrl,
    },
    authors: [{ name: "MY MART" }],
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
      </body>
    </html>
  );
}
