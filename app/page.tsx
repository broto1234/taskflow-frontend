import Link from 'next/link';

const features = [
  {
    icon: '✓',
    title: 'Task Management',
    description: 'Create, edit, delete, and organize your tasks in one place.',
  },
  {
    icon: '↗',
    title: 'Track Progress',
    description: 'Update task statuses and keep track of what needs to get done.',
  },
  {
    icon: '⌕',
    title: 'Search & Filter',
    description: 'Find tasks quickly using search and status filters.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 sm:py-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Task<span className="text-blue-400">Flow</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-500 px-3 py-2.5 text-xs font-semibold hover:bg-blue-400 sm:px-5 sm:text-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 text-center sm:pt-28">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            Simple. Organized. Productive.
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
            Take control of your work with{' '}
            <span className="text-blue-400">TaskFlow.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Plan your work, manage your tasks, and track your progress.
            Everything you need to stay organized and get things done.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="rounded-xl bg-blue-500 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-400"
            >
              Start Managing Tasks →
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-slate-200 hover:bg-slate-900"
            >
              I already have an account
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl gap-5 text-left md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl font-bold text-blue-400">
                {feature.icon}
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                {feature.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 TaskFlow. Built to help you work smarter.
      </footer>
    </main>
  );
}