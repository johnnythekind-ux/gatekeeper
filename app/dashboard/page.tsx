import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import BillingPortalButton from "@/components/BillingPortalButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan, status, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const plan = subscription?.plan ?? "free";
  const status = subscription?.status ?? "inactive";
  const isActive = subscription?.status === "active";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold text-emerald-400">
          Authenticated Workspace
        </p>

        <h1 className="mt-3 text-4xl font-bold">Dashboard</h1>

        <p className="mt-4 text-slate-300">Welcome back, {user.email}</p>

        <div className="mt-6">
          <LogoutButton />
        </div>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Entitlement Status
          </p>

          <p className="mt-2 text-sm text-slate-400">Current Plan</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold uppercase text-emerald-400">
              {plan}
            </span>

            <span className="text-sm text-slate-400">
              Subscription status: {status}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {isActive ? (
              <>
                <a
                  href="/pro-feature"
                  className="inline-flex items-center rounded-xl bg-green-500 px-5 py-3 text-sm font-medium text-black transition hover:bg-green-400"
                >
                  Access Protected Feature
                </a>

                <BillingPortalButton />
              </>
            ) : (
              <a
                href="/pricing"
                className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Upgrade to Pro
              </a>
            )}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Access
            </p>
            <p className="mt-2 text-xl font-semibold text-emerald-400">
              {isActive ? "Granted" : "Limited"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Billing
            </p>
            <p className="mt-2 text-xl font-semibold text-emerald-400">
              {isActive ? "Enabled" : "Inactive"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Protection
            </p>
            <p className="mt-2 text-xl font-semibold text-emerald-400">
              {isActive ? "Active" : "Restricted"}
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-6 text-xl font-semibold">
            Subscription Architecture Overview
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-bold">Billing Infrastructure</h3>

              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>✓ Stripe Checkout</li>
                <li>✓ Stripe Webhooks</li>
                <li>✓ Stripe Billing Portal</li>
                <li>✓ Supabase Authentication</li>
                <li>✓ Entitlement Enforcement</li>
                <li>✓ PostgreSQL Persistence</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-bold">Technology Stack</h3>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>Frontend: Next.js + TypeScript</p>
                <p>Auth: Supabase Auth</p>
                <p>Database: PostgreSQL</p>
                <p>Payments: Stripe</p>
                <p>Deployment: Vercel</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-bold">What This Demonstrates</h3>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                Demonstrates authentication, subscription billing, Stripe
                webhooks, entitlement enforcement, protected routes, customer
                billing management, and production deployment workflows.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}