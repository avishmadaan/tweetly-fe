import Link from "next/link";

export default function Custom404() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-xl mt-4">Oops! Page not found.</p>
          <Link href="/login" className="mt-6 inline-block text-blue-500 hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }