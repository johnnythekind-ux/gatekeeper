"use client";

export default function PricingPage() {
  async function handleCheckout() {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Billing & Access Control</h1>

<p className="mt-4 max-w-2xl text-slate-300">
  Demonstrates Stripe Checkout, subscription management,
entitlement enforcement, webhook processing,
and customer billing portal integration.
</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="mt-2 text-slate-300">$0/month</p>
            <p className="mt-4 text-sm text-slate-400">
              Basic authenticated access with limited features.
            </p>

<ul className="mt-4 space-y-2 text-sm text-slate-400">
  <li>✓ Public pages</li>
  <li>✓ Account creation</li>
  <li>✓ Authentication</li>
  <li>✗ Premium features</li>
</ul>

          </div>

          <div className="rounded-2xl border border-emerald-500 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="mt-2 text-slate-300">$19/month</p>
            <p className="mt-4 text-sm text-slate-400">
              Includes premium access, billing portal controls,
subscription synchronization, and protected routes.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
  <li>✓ Stripe Checkout</li>
  <li>✓ Stripe Webhooks</li>
  <li>✓ Subscription synchronization</li>
  <li>✓ Billing portal access</li>
  <li>✓ Protected routes</li>
</ul>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-semibold text-slate-950"
            >
              Launch Stripe Checkout
            </button>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
  <h3 className="text-lg font-semibold">
  Architecture Demonstrated
</h3>

<p className="mt-1 text-sm text-emerald-400">
  End-to-end SaaS billing and entitlement workflow.
</p>

<p className="mt-3 text-slate-300">
  This workflow demonstrates a complete SaaS billing architecture including Stripe Checkout, Stripe Webhooks, subscription synchronization, entitlement enforcement, protected routes, customer billing management, Supabase authentication, and PostgreSQL persistence.
</p>
</div>
      </div>
    </main>
  );
}