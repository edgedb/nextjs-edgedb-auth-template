import { auth } from "@/edgedb";
import Link from "next/link";
import NextSteps from "@/components/NextSteps";
import { EdgeDB_Vercel } from "@/components/Logo";

export default async function Home() {
  const session = auth.getSession();

  const signedIn = await session.isSignedIn();

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <a className='contents' href='https://github.com/edgedb/nextjs-edgedb-auth-template' target='_blank' rel="noopener noreferrer">
            <img src="/github.png" alt="GitHub" className="h-6 block hover:scale-105 transform transition duration-300 ease-in-out" />
          </a>
          {!signedIn ? (
            <div className="space-x-4">
              <Link
                href={auth.getBuiltinUIUrl()}
                prefetch={false}
                className="text-sm font-semibold leading-6 text-gray-800"
              >
                <button className="ring-2 ring-inset ring-primary bg-primarylight px-4 py-2 rounded-md">
                  Sign in
                </button>
              </Link>
              <Link
                href={auth.getBuiltinUISignUpUrl()}
                prefetch={false}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <button className="bg-primary px-4 py-2 rounded-md text-white">
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <Link
              href="dashboard"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <button className="bg-primary px-4 py-2 rounded-md text-white">
                Dashboard
              </button>
            </Link>
          )}
        </nav>
      </header>

      <div className="relative isolate px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-16 sm:pt-24 lg:pt-32 flex flex-col items-center">
          <EdgeDB_Vercel />
          <div className="text-center mt-10">
            <h1 className="text-4xl py-2 font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#259474] to-[#1A67FF]
          ">
              EdgeDB Next.js Auth Template
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Welcome to the EdgeDB Next.js Starter. This starter is designed to
              help you get up and running with EdgeDB and Next.js quickly. It
              includes a basic setup for authentication, EdgeDB schema, and a UI
              to get you started. Below are some next steps to help you get up
              to speed.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-2xl pt-4 sm:pt-8 lg:pt-12">
          <NextSteps />
        </div>
      </div>
    </div>
  );
}
