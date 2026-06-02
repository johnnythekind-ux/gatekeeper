export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
  Portfolio SaaS Demonstration
</p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Gatekeeper
        </h1>

        <p className="mt-4 text-sm uppercase tracking-widest text-emerald-400">
  Authentication • Billing • Entitlements • Webhooks
</p>

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
      <section className="mx-auto max-w-6xl px-6 pb-20">
  <h2 className="mb-8 text-center text-3xl font-bold">
    Key Features
  </h2>

  <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-xl border border-slate-800 p-4">
      ✓ Stripe Checkout Integration
    </div>

    <div className="rounded-xl border border-slate-800 p-4">
      ✓ Stripe Billing Portal
    </div>

    <div className="rounded-xl border border-slate-800 p-4">
      ✓ Webhook Event Processing
    </div>

    <div className="rounded-xl border border-slate-800 p-4">
      ✓ Subscription State Synchronization
    </div>

    <div className="rounded-xl border border-slate-800 p-4">
      ✓ Protected Premium Features
    </div>

    <div className="rounded-xl border border-slate-800 p-4">
      ✓ Supabase Authentication
    </div>

    <div className="rounded-xl border border-slate-800 p-4">
      ✓ Entitlement Logic
    </div>

    <div className="rounded-xl border border-slate-800 p-4">
      ✓ Production Deployment on Vercel
    </div>
  </div>
</section>

<section className="mx-auto max-w-6xl px-6 pb-20">
  <h2 className="mb-8 text-center text-3xl font-bold">
    Tech Stack
  </h2>

  <div className="flex flex-wrap justify-center gap-3">
    <span className="rounded-full border border-slate-700 px-4 py-2">
      Next.js
    </span>

    <span className="rounded-full border border-slate-700 px-4 py-2">
      TypeScript
    </span>

    <span className="rounded-full border border-slate-700 px-4 py-2">
      Stripe
    </span>

    <span className="rounded-full border border-slate-700 px-4 py-2">
      Supabase
    </span>

    <span className="rounded-full border border-slate-700 px-4 py-2">
      PostgreSQL
    </span>

    <span className="rounded-full border border-slate-700 px-4 py-2">
      Vercel
    </span>
  </div>
</section>

<section className="mx-auto max-w-4xl px-6 pb-24 text-center">
  <h2 className="mb-6 text-3xl font-bold">
    What This Demonstrates
  </h2>

  <p className="text-lg text-slate-300">
    Gatekeeper demonstrates a complete SaaS billing and
    entitlement architecture including authentication,
    subscription management, Stripe webhooks, billing
    portal integration, protected routes, and production
    deployment workflows.
  </p>
</section>

<section className="mx-auto max-w-6xl px-6 pb-24">
  <h2 className="mb-8 text-center text-3xl font-bold">
    What This Project Demonstrates
  </h2>

  <div className="grid gap-4 md:grid-cols-4">
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="font-bold">Authentication</h3>
      <p className="mt-3 text-sm text-slate-300">
        Supabase Auth, user sessions, protected dashboard access.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="font-bold">Billing</h3>
      <p className="mt-3 text-sm text-slate-300">
        Stripe Checkout, recurring subscriptions, and billing portal access.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="font-bold">Webhooks</h3>
      <p className="mt-3 text-sm text-slate-300">
        Stripe event processing with subscription sync into Supabase.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="font-bold">Authorization</h3>
      <p className="mt-3 text-sm text-slate-300">
        Entitlement checks that control access to premium features.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}