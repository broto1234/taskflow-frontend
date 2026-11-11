import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-10 text-center shadow-sm">
        <h1 className="text-4xl font-bold">TaskFlow</h1>

        <p className="mt-4 text-gray-600">
          Organize your work, track your progress, and get things done.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
          >
            Create an account
          </Link>

          <Link
            href="/login"
            className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-100"
          >
            Log in
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          New to TaskFlow? Create an account to get started.
        </p>
      </div>
    </main>
  );
}
