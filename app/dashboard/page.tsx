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

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Current Plan</p>
          <p className="mt-2 text-2xl font-bold capitalize">{plan}</p>
          <p className="mt-2 text-sm text-slate-400">
            Subscription status: {status}
          </p>

<div className="mt-6 flex flex-wrap gap-3">
  {subscription?.status === "active" ? (
    <>
      <a
        href="/pro-feature"
        className="inline-flex items-center rounded-xl bg-green-500 px-5 py-3 text-sm font-medium text-black transition hover:bg-green-400"
      >
        Access Pro Feature
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

  <h2 className="mt-10 mb-6 text-xl font-semibold">
  Portfolio Architecture Overview
</h2>

  <div className="mt-0 grid gap-4 md:grid-cols-3">
  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
    <h2 className="text-lg font-bold">Subscription Infrastructure</h2>
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
    <h2 className="text-lg font-bold">System Architecture</h2>
    <div className="mt-4 space-y-2 text-sm text-slate-300">
      <p>Frontend: Next.js + TypeScript</p>
      <p>Auth: Supabase Auth</p>
      <p>Database: PostgreSQL</p>
      <p>Payments: Stripe</p>
      <p>Deployment: Vercel</p>
    </div>
  </div>

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
    <h2 className="text-lg font-bold">About This Project</h2>
    <p className="mt-4 text-sm leading-6 text-slate-300">
      Gatekeeper is a portfolio SaaS application demonstrating subscription billing,
      authentication, entitlement logic, webhook processing, and protected feature access.
    </p>
  </div>
</div>

</div>

        </div>
      </div>
    </main>
  );
}