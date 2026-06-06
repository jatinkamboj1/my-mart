import Link from 'next/link';
import "@/styles/bootstrap.css";

import "@/styles/global.scss";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-green-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! We couldn&apos;t find the page you were looking for.</p>
      <p className="mt-2 text-lg text-gray-500">
        My Mart is dedicated to providing reliable services across Canada, but it seems this page has taken a wrong turn.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-yellow-400 hover:text-black">
            Go Back to Home
        </Link>
      </div>
    </div>
  </div>
  );
};
