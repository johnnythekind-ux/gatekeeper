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
        <h1 className="text-4xl font-bold">Pricing</h1>

        <p className="mt-4 text-slate-300">
          Choose the plan that controls access, billing, and usage limits.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="mt-2 text-slate-300">$0/month</p>
            <p className="mt-4 text-sm text-slate-400">
              Basic access with limited usage.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="mt-2 text-slate-300">$19/month</p>
            <p className="mt-4 text-sm text-slate-400">
              Unlock premium access, higher usage, and subscription controls.
            </p>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-semibold text-slate-950"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}