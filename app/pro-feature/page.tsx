import { requireProUser } from "@/lib/entitlements";

export default async function ProFeaturePage() {
  const { user } = await requireProUser();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold text-emerald-400">
          Protected Route
        </p>

        <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Entitlement Verified
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Premium Access Granted
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            This page is only visible to authenticated users with an active Pro
            subscription.
          </p>

          <p className="mt-6 text-sm text-slate-400">
            Signed in as: {user.email}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Access
              </p>
              <p className="mt-2 font-semibold text-emerald-400">
                Granted
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Subscription
              </p>
              <p className="mt-2 font-semibold text-emerald-400">
                Active
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Route
              </p>
              <p className="mt-2 font-semibold text-emerald-400">
                Protected
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h2 className="text-lg font-bold">
              What This Page Demonstrates
            </h2>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>✓ Server-side entitlement verification</li>
              <li>✓ Active subscription requirement</li>
              <li>✓ Protected premium feature delivery</li>
              <li>✓ Authenticated user validation</li>
            </ul>
          </div>

          <a
            href="/dashboard"
            className="mt-8 inline-flex rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:border-slate-500"
          >
            Back to Dashboard
          </a>
        </section>
      </div>
    </main>
  );
}