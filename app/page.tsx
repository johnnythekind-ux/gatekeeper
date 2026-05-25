export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
          CRS Mechanical App #5
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Gatekeeper
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          SaaS billing, subscriptions, webhooks, entitlement logic, and usage
          enforcement in one production-style infrastructure app.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/pricing"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950"
          >
            View Pricing
          </a>

          <a
            href="/dashboard"
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white"
          >
            Go to Dashboard
          </a>
        </div>
      </section>
    </main>
  );
}